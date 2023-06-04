import { Navigate, Outlet, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'

import Button from '../components/Button'
import { authTypes } from '../types/types'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = () => {
  const location = useLocation()
  const { user } = useAuth() as authTypes

  // user = undefined

  // useEffect(() => {
  //   console.log(user)
  // }, [user])

  if (user === undefined) {
    return (
      <>
        <div className='flex min-h-screen grow bg-gray-300'>
          <div>
            <nav className='min-h-screen w-[255px] flex-none bg-gray-200'>
              <section className='flex flex-col gap-3 pt-6'>
                <Button active className='z-0 mx-2.5 h-8 animate-pulse bg-gray-300 text-blue-500' />

                <Button active className='z-0 mx-2.5 h-8 animate-pulse bg-gray-300 text-blue-500' />
              </section>
            </nav>
          </div>
        </div>
      </>
    )
  }

  return user ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} />
}

export default PrivateRoute
