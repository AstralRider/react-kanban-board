import { createContext, useState, useEffect, useContext } from 'react'
import { auth } from '../lib/firebase'
import { authTypes, providerType } from '../types/types'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { User as FirebaseUser } from 'firebase/auth'
const AuthenticationContext = createContext<authTypes | null>(null)

export const Provider = ({ children }: providerType) => {
  const [user, setUser] = useState<FirebaseUser | undefined>()

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
    const provider = new GithubAuthProvider()
    try {
      const res = await signInWithPopup(auth, provider)
      return res
    } catch (e) {
      //remove alert and handle error correctly later
      //handle multiple user with same email error
      alert(e)
    }
  }
  //auth provider logic
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const res = await signInWithPopup(auth, provider)
      return res
    } catch (e) {
      //remove alert and handle error correctly later
      alert(e)
    }
  }

  //log out logic
  const logOut = (): void => {
    signOut(auth)
  }

  let value = { googleSignIn, user, logOut, githubSignIn }

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export default AuthenticationContext

export const useAuth = () => {
  return useContext(AuthenticationContext)
}
