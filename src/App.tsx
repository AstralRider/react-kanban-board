import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import AppComponent from './components/AppComponent'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import PrivateRoute from './Routes/PrivateRoute'
import React from 'react'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<NavBar />} path='app'>
          <Route element={<AppComponent />} path=':id' />
          {/* <Route element={<AppComponent />} path='app/:id' /> */}
        </Route>
      </Route>
    </Route>,
  ),
)

function App() {
  return <RouterProvider router={router} />
}

export default App
