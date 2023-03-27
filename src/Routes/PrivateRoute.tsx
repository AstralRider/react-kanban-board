import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authTypes } from '../types/types'

const PrivateRoute = () => {
  const location = useLocation()
  const { user } = useAuth() as authTypes

  return user ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} />
}

export default PrivateRoute
