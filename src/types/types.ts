import { User as FirebaseUser, UserCredential } from 'firebase/auth'

export type authTypes = {
  googleSignIn: () => Promise<{ result: UserCredential | undefined; err: string | undefined }>
  user: FirebaseUser | undefined
  logOut: () => void
  githubSignIn: () => Promise<{ result: UserCredential | undefined; err: string | undefined }>
  uid: string | undefined
  loading: boolean
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
