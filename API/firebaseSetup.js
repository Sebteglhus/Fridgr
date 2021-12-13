import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import key from './key';



const firebaseSetup = async () => {
  const firebaseConfig = key;
  if (!firebase.apps.length) {
    initializeApp(firebaseConfig);
    console.log("firebase initiated");
  }
  //fridgeData = docSnap.data();
} 
export default firebaseSetup;
