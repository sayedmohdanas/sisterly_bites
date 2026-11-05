import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAnalytics, isSupported } from "firebase/analytics";

// Safely extract environment variables across Vite browser environment and Node CLI runners
const env = (typeof import.meta !== "undefined" && import.meta.env) ? import.meta.env : (typeof process !== "undefined" ? process.env : {});

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyDyVWWfhnb_izENSSGFfjpFnM280t0tQNY",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "sisterlybites-94628.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "sisterlybites-94628",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "sisterlybites-94628.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "153432873617",
  appId: env.VITE_FIREBASE_APP_ID || "1:153432873617:web:0308cc05dd918ec8bffd30",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-W4PLRDKM4L"
};

// Utility boolean check to determine if valid Firebase environment variables are provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app = null;
let db = null;
let functions = null;
let analytics = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  functions = getFunctions(app);

  if (typeof window !== "undefined") {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    }).catch(() => {});
  }
} catch (error) {
  console.warn("Firebase initialization warning:", error.message);
}

export { app, db, functions, analytics };
