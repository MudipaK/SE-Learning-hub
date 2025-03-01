// Load Firebase configuration from a secure source
async function loadFirebaseConfig() {
    try {
        // In production, this should fetch from your secure backend
        // For development, you can load from a local config file
        const response = await fetch('/config/firebase-config.json');
        if (!response.ok) {
            throw new Error('Config not found');
        }
        window.FIREBASE_CONFIG = await response.json();
    } catch (error) {
        console.warn('Failed to load Firebase config, falling back to demo mode:', error);
        window.FIREBASE_CONFIG = null;
    }
}