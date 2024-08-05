import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, doc, getDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCr_lREx3D2tFfbCAnSlkq-imQKPlUA_5s",
  authDomain: "muvi-86973.firebaseapp.com",
  databaseURL: "https://muvi-86973-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "muvi-86973",
  storageBucket: "muvi-86973.appspot.com",
  messagingSenderId: "88955528642",
  appId: "1:88955528642:web:a071493f612e0348e1625b",
  measurementId: "G-EW203BB9PC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage()

export{
  db,
  storage,
  doc,
  getDoc,
  collection,
  onSnapshot,
  ref,
  getDownloadURL,
  listAll
}
