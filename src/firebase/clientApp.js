import {initializeApp} from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBPz5FG0SYPWo-40IhOi4zR-C4_Mx_YssY",
    authDomain: "sportbuddy-68397.firebaseapp.com",
    projectId: "sportbuddy-68397",
    storageBucket: "sportbuddy-68397.appspot.com",
    messagingSenderId: "659631696507",
    appId: "1:659631696507:web:b54b0872f7de3b3ada50de",
};

initializeApp(firebaseConfig)


export const auth = getAuth(initializeApp(firebaseConfig))
export const doItTogether = getFirestore()