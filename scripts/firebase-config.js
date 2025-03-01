// Firebase configuration - Load from environment variables
const getFirebaseConfig = () => {
    const config = {
        apiKey: window.FIREBASE_CONFIG?.apiKey || 'demo-mode',
        authDomain: window.FIREBASE_CONFIG?.authDomain || 'demo-mode',
        projectId: window.FIREBASE_CONFIG?.projectId || 'demo-mode',
        storageBucket: window.FIREBASE_CONFIG?.storageBucket || 'demo-mode',
        messagingSenderId: window.FIREBASE_CONFIG?.messagingSenderId || 'demo-mode',
        appId: window.FIREBASE_CONFIG?.appId || 'demo-mode'
    };

    // Validate configuration
    if (config.apiKey === 'demo-mode') {
        console.warn('Firebase config not found. Running in demo mode with local storage.');
        return null;
    }

    return config;
};

// Initialize Firebase with offline persistence
try {
    const firebaseConfig = getFirebaseConfig();
    
    if (firebaseConfig) {
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        
        // Enable offline capabilities
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
    } else {
        // Fallback to local storage if no config
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
} catch (error) {
    console.error('Firebase initialization error:', error);
    // Error handling is already included in the try block
}