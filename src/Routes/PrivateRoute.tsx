import { Navigate, Outlet, useLocation } from 'react-router-dom'

import React from 'react'
import { authTypes } from '../types/types'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = () => {
  const location = useLocation()
  const { user } = useAuth() as authTypes

  return user ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} />
}

export default PrivateRoute
