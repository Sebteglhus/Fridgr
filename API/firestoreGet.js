import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';



/*const firestoreGet = async () => {
    const db = getFirestore();
    

    const dataFetch = async () => {
      const docRef = doc(db, "Fridge", "sebsFridge");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());
      } else {
        console.log("no such document!")
      }
    }
    dataFetch();
}*/

//export default firestoreGet;
