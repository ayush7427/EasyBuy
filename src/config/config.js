const config = {
    apiKey:String(import.meta.env.VITE_FIREBASE_API_KEY),
    authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGINING_SENDER_ID),
    appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
    adminEmail: String(import.meta.env.VITE_ADMIN_EMAIL),
    razorPayKey: String(import.meta.env.VITE_RAZORPAY_KEY),
    razorPayKeySecret: String(import.meta.env.VITE_RAZORPAY_KEY_SECRET)
}

export default config