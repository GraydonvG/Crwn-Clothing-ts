import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
  type NextOrObserver,
  type User,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

import type { CategoryType } from '../../store/categories/categories.slice';

const firebaseConfig = {
  apiKey: 'AIzaSyDk7C6MsLlS4PkkBxDrq1-OjIsfhzyZyRg',
  authDomain: 'crwn-clothing-db-70d5a.firebaseapp.com',
  projectId: 'crwn-clothing-db-70d5a',
  storageBucket: 'crwn-clothing-db-70d5a.appspot.com',
  messagingSenderId: '171035978542',
  appId: '1:171035978542:web:c0db8299e92eaf1aa228bf',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export async function signInWithGooglePopup() {
  return await signInWithPopup(auth, googleProvider);
}

export async function createAuthUserWithEmailAndPassword(email: string, password: string) {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInAuthUserWithEmailAndPassword(email: string, password: string) {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function createUserDocumentFromAuth(additionalInformation = {}) {
  if (!auth.currentUser) return;

  const userDocRef = doc(db, 'users', auth.currentUser.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return;
  } else {
    const { email, displayName } = auth.currentUser;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        createdAt,
        displayName,
        email,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating user', error);
    }
  }
}

export async function signOutUser() {
  signOut(auth);
}

export function onAuthStateChangedListener(callback: NextOrObserver<User>) {
  onAuthStateChanged(auth, callback);
}

export type ObjectToAdd = {
  title: string;
};

export async function addCollectionAndDocuments<T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]) {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
}

export async function getCategoriesAndDocuments(): Promise<CategoryType[]> {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as CategoryType);
}

export async function getUserDoc() {
  if (!auth.currentUser) return;

  const userDocRef = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
}

export async function updateUserProfile(displayName: string) {
  if (!auth.currentUser) return;

  await updateProfile(auth.currentUser, { displayName });

  return auth.currentUser;
}
