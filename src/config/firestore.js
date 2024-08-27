import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: api key id,
  authDomain: aut domain id,
  projectId: project id,
  storageBucket: storage bucket id,
  messagingSenderId: messaging sender id,
  appId: "1:1065932053713:web:app id,
  measurementId: measurement id,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
