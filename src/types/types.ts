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
  subtle?: string
  filled?: string
  gradient?: string
  shadow?: string
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>
