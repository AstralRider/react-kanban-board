// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCjpKmTCMCD3Chzo39xrEWFjAb8R64ZpAE',
  authDomain: 'react-trello-clone-64906.firebaseapp.com',
  projectId: 'react-trello-clone-64906',
  storageBucket: 'react-trello-clone-64906.appspot.com',
  messagingSenderId: '599400032784',
  appId: '1:599400032784:web:9395059e1c61006407b895',
  measurementId: 'G-82PPZMZL4N',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

//auth
export const auth = getAuth(app)

//firestore
export const db = getFirestore(app)
