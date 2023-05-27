import React, { useContext, useEffect } from 'react'

import { AiFillGithub } from 'react-icons/ai'
import AuthenticationContext from '../context/AuthContext'
import { FcGoogle } from 'react-icons/fc'
import { ImFacebook2 } from 'react-icons/im'
import { authTypes } from '../types/types'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { googleSignIn, user, githubSignIn } = useContext(AuthenticationContext) as authTypes

  const navigate = useNavigate()

  const handleGoogleClick = () => {
    googleSignIn()
  }

  const handleGithubClick = () => {
    githubSignIn()
  }

  //if user logs in, redirect to application page.
  useEffect(() => {
    if (user?.uid) {
      navigate('/app')
    }
  }, [user])

  return (
    <div className='flex h-screen'>
      <div className='m-auto flex h-96 min-h-max w-80 flex-col justify-evenly overflow-hidden rounded-lg bg-gray-50 shadow-lg ring-1 ring-gray-200 sm:w-96'>
        {/* Header Section */}
        <div className='mt-10 flex items-center gap-x-4'>
          <div className='h-px flex-auto bg-gray-200'></div>
          <h4 className='text-md flex-none font-semibold leading-6 text-indigo-600'>Log in</h4>
          <div className='h-px flex-auto bg-gray-200'></div>
        </div>
        {/* End Header Section */}

        {/* Buttons Section */}
        <div className='flex h-60 flex-col justify-around px-14'>
          <button
            onClick={handleGoogleClick}
            className='flex cursor-pointer items-center justify-center gap-x-3 rounded-md px-4 py-1 text-sm shadow-md outline outline-1 outline-gray-200 hover:bg-gray-100  active:translate-y-0.5 sm:text-base'
          >
            <FcGoogle className='text-lg' />
            Log in with Google
          </button>
          <button className='flex cursor-pointer items-center justify-center gap-x-2 rounded-md px-4 py-1 text-sm shadow-md outline outline-1 outline-gray-200 hover:bg-gray-100  active:translate-y-0.5 sm:text-base'>
            <ImFacebook2 className='text-lg text-blue-600' />
            Log in with Facebook
          </button>
          <button
            onClick={handleGithubClick}
            className='flex cursor-pointer items-center justify-center gap-x-3 rounded-md px-4 py-1 text-sm shadow-md outline outline-1 outline-gray-200 hover:bg-gray-100 active:translate-y-0.5 sm:text-base'
          >
            <AiFillGithub className='text-lg' />
            Log in with Github
          </button>
        </div>
        {/* End Buttons Sections */}
      </div>
    </div>
  )
}

export default LoginPage
