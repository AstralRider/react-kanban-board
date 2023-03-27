import LandingPage from './pages/LandingPage'
import { Routes, Route, Router } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './Routes/PrivateRoute'
import ApplicationPage from './pages/ApplicationPage'

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
