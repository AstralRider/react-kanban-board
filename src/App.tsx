import React, { Route, Routes } from 'react-router-dom'

import AppComponent from './components/AppComponent'
import ApplicationPage from './pages/ApplicationPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import PrivateRoute from './Routes/PrivateRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<NavBar />}>
          <Route element={<ApplicationPage />} path='app' />
          <Route element={<AppComponent />} path='app/:id' />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
