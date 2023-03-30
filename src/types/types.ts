import { User as FirebaseUser } from 'firebase/auth'
import { ReactNode } from 'react'

export type authTypes = {
  googleSignIn: () => Promise<any>
  user: FirebaseUser | undefined
  logOut: () => void
  githubSignIn: () => Promise<any>
}

export type providerType = {
  children?: React.ReactNode
}

export type buttonTypes = {
  subtle?: boolean
  filled?: boolean
  gradient?: boolean
  shadow?: boolean
  active?: boolean
  textCenter?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>
