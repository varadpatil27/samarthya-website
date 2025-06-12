// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDAiSa6uvPbi_Jr6i-xJlLzlqKHVsUI7q8",
  authDomain: "samarthya-website.firebaseapp.com",
  databaseURL: "https://samarthya-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "samarthya-website",
  storageBucket: "samarthya-website.firebasestorage.app",
  messagingSenderId: "608536361412",
  appId: "1:608536361412:web:475e9ab0a5cbb68e898c91"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
