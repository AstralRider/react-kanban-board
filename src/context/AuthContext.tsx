import {
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authTypes, providerType } from '../types/types'

import { User as FirebaseUser } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { promiseHandler } from '../lib/FirebaseQueries'

const AuthenticationContext = createContext<authTypes | null>(null)

export const Provider = ({ children }: providerType) => {
  const [user, setUser] = useState<FirebaseUser | undefined>()
  const [loading, setLoading] = useState(true)

  let uid

  //listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false)
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
  const logOut = async () => {
    await signOut(auth)
    setUser(undefined)
    console.log('User has been logged out')
  }

  const value = { googleSignIn, user, logOut, githubSignIn, uid, loading }

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationContext

export const useAuth = () => {
  return useContext(AuthenticationContext)
}
