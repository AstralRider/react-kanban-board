import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authTypes } from '../types/types'

const ApplicationPage = () => {
  const { user } = useAuth() as authTypes
  const navigate = useNavigate()

  //if user is not logged in, redirect to login page
  useEffect(() => {
    if (!user?.uid) {
      navigate('login')
    }
  }, [user])

  return (
    <>
      <div className='flex'>
        <div className='min-h-screen w-64 flex-none bg-blue-200'>Navigation Shell</div>
        <div className='min-h-screen grow bg-gray-300'>Application Shell</div>
      </div>
    </>
  )
}

export default ApplicationPage
