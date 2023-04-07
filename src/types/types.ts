import { User as FirebaseUser, UserCredential } from 'firebase/auth'

export type authTypes = {
  googleSignIn: () => Promise<UserCredential | undefined>
  user: FirebaseUser | undefined
  logOut: () => void
  githubSignIn: () => Promise<UserCredential | undefined>
}

export type providerType = {
  children?: React.ReactNode
}

export type buttonTypes = {
  subtle?: boolean
  grey?: boolean
  filled?: boolean
  gradient?: boolean
  shadow?: boolean
  active?: boolean
  textCenter?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>
