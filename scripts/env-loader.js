// Function to safely load environment variables
function loadEnv() {
    try {
        // Try to load from .env file if in development
        if (process.env) {
            return {
                FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || "AIzaSyBnLf6eQxC7aDsiRMcX89wviEzdFnwkALk",
                FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || "se-learn-72702.firebaseapp.com",
                FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "se-learn-72702",
                FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET || "se-learn-72702.firebasestorage.app",
                FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || "55327690590",
                FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || "1:55327690590:web:318f31a2f5e9ba76b3c9cf",
                FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID || "G-CVFBT3495B"
            };
        }
    } catch (error) {
        console.warn('Error loading environment variables:', error);
    }
    
    // Fallback to window.env if available
    if (window.env) {
        return window.env;
    }
    
    // Final fallback to hardcoded values (only for development)
    return {
        FIREBASE_API_KEY: "AIzaSyBnLf6eQxC7aDsiRMcX89wviEzdFnwkALk",
        FIREBASE_AUTH_DOMAIN: "se-learn-72702.firebaseapp.com",
        FIREBASE_PROJECT_ID: "se-learn-72702",
        FIREBASE_STORAGE_BUCKET: "se-learn-72702.firebasestorage.app",
        FIREBASE_MESSAGING_SENDER_ID: "55327690590",
        FIREBASE_APP_ID: "1:55327690590:web:318f31a2f5e9ba76b3c9cf",
        FIREBASE_MEASUREMENT_ID: "G-CVFBT3495B"
    };
}