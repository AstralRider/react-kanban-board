import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'react-trello-clone-64906.firebaseapp.com',
  projectId: 'react-trello-clone-64906',
  storageBucket: 'react-trello-clone-64906.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

//auth
export const auth = getAuth(app)

//firestore
export const db = getFirestore(app)
