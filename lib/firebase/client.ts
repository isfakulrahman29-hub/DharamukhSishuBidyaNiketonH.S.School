import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

let app;
let auth: Auth | any = null;
let db: Firestore | any = null;
let storage: FirebaseStorage | any = null;

if (typeof window !== 'undefined' && firebaseConfig.apiKey) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  try {
    auth = getAuth(app);
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    storage = getStorage(app);
  } catch (error) {
    console.warn("Firebase initialization error", error);
  }
}

export { app, auth, db, storage };
