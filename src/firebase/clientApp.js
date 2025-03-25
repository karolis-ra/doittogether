import {initializeApp} from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";




initializeApp(firebaseConfig)


export const auth = getAuth(initializeApp(firebaseConfig))
export const doItTogether = getFirestore()
