import { User as FirebaseUser } from 'firebase/auth'

export type authTypes = {
  googleSignIn: () => Promise<any>
  user: FirebaseUser | undefined
  logOut: () => void
  githubSignIn: () => Promise<any>
}

export type providerType = {
  children?: React.ReactNode
}
