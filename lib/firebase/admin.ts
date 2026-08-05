import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

import firebaseConfigData from '../../firebase-applet-config.json';

if (!getApps().length) {
  try {
    initializeApp(); // Falls back to GOOGLE_APPLICATION_CREDENTIALS or default credentials in many environments.
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const adminAuth = getAuth();
const app = getApps()[0];
export const adminDb = app ? getFirestore(app, firebaseConfigData.firestoreDatabaseId) : getFirestore();
export const adminStorage = getStorage();
