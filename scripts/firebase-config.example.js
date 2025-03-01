// Firebase configuration template - Replace these values with your own Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase with offline persistence to handle connection issues
try {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    
    // Enable offline capabilities to handle connection issues
    db.enablePersistence({ synchronizeTabs: true })
        .catch(err => {
            if (err.code === 'failed-precondition') {
                console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
            } else if (err.code === 'unimplemented') {
                console.warn('The current browser does not support offline persistence.');
            }
        });

    // Handle connection state changes
    firebase.firestore().enableNetwork().catch(err => {
        console.error('Firebase network error:', err);
    });

    // Export database instance
    window.db = db;
} catch (error) {
    console.error('Firebase initialization error:', error);
    // Fallback to local storage if Firebase fails
    window.db = {
        collection: (name) => ({
            add: (data) => {
                const collection = JSON.parse(localStorage.getItem(name) || '[]');
                const id = 'local_' + Date.now();
                collection.push({...data, id, createdAt: new Date().toISOString()});
                localStorage.setItem(name, JSON.stringify(collection));
                return Promise.resolve({id});
            },
            where: () => ({
                orderBy: () => ({
                    get: () => {
                        const collection = JSON.parse(localStorage.getItem(name) || '[]');
                        return Promise.resolve({
                            empty: collection.length === 0,
                            forEach: (callback) => collection.forEach(doc => callback({
                                data: () => ({...doc, timestamp: {toDate: () => new Date(doc.createdAt)}})
                            }))
                        });
                    }
                })
            })
        })
    };
}