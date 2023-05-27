import React, { Route, Router, Routes } from 'react-router-dom'

import ApplicationPage from './pages/ApplicationPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './Routes/PrivateRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<ApplicationPage />} path='/app' />
      </Route>
    </Routes>
  )
}

export default App
