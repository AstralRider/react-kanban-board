import { createContext, useState, useEffect, useContext } from 'react'
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut,
  UserCredential,
} from 'firebase/auth'
import { User as FirebaseUser } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { authTypes, providerType } from '../types/types'
import { promiseHandler } from '../lib/firebaseQueries'
const AuthenticationContext = createContext<authTypes | null>(null)

export const Provider = ({ children }: providerType) => {
  const [user, setUser] = useState<FirebaseUser | undefined>()

  let uid

  //listen for auth state changes
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      }
    })
    //remove listener
    return () => unsubscribe()
  }, [])

  //auth provider logic
  const githubSignIn = async () => {
    const creds = signInWithPopup(auth, new GithubAuthProvider())
    return promiseHandler<UserCredential>(creds)
  }
  //auth provider logic
  const googleSignIn = async () => {
    const cred = signInWithPopup(auth, new GoogleAuthProvider())
    return promiseHandler<UserCredential>(cred)
  }

  //log out logic
  const logOut = (): void => {
    signOut(auth)
  }

  let value = { googleSignIn, user, logOut, githubSignIn, uid }

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationContext

export const useAuth = () => {
  return useContext(AuthenticationContext)
}
