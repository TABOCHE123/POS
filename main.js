import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from './config.js';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

// Function to read data from Firebase
function readData(path) {
  if (typeof path === 'string' && path.length > 0 && !/[.#$[\]]/.test(path)) {
    const dbRef = ref(database);
    get(child(dbRef, path)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error("Error reading data:", error);
    });
  } else {
    console.error('Invalid path:', path);
  }
}

// Function to write data to Firebase
function writeData(path, data) {
  if (typeof path === 'string' && path.length > 0 && !/[.#$[\]]/.test(path)) {
    const dbRef = ref(database, path);
    set(dbRef, data)
      .then(() => {
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  } else {
    console.error('Invalid path:', path);
  }
}

// Function to sign up a new user
function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing up:", error);
    });
}

// Function to log in a user
function logIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
}
