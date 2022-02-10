import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
// import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsvX_pKOTqHbzyuff72qnhl40J9gF5U8U",
    authDomain: "plantstagram-55963.firebaseapp.com",
    projectId: "plantstagram-55963",
    storageBucket: "plantstagram-55963.appspot.com",
    messagingSenderId: "757849142425",
    appId: "1:757849142425:web:5774154b3b70eeb2d0b408",
    measurementId: "G-CG2KWR58K6"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)


// const storage = firebase.storage();
// export { storage, firebase as default };
