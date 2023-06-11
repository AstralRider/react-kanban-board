import React, { Suspense, lazy } from 'react'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import PrivateRoute from './Routes/PrivateRoute'

const AppComponent = lazy(() => import('./components/AppComponent'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const NavBar = lazy(() => import('./components/NavBar'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='home' element={<LandingPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<NavBar />} path='app'>
          <Route element={<AppComponent />} path=':id' />
        </Route>
      </Route>
    </Route>,
  ),
)

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
{
  /* <Route element={<AppComponent />} path='app/:id' /> */
}
