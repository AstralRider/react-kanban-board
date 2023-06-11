/* eslint-disable react/prop-types */

import { Outlet, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { addBoard, deleteBoard, editBoardName, getBoard } from '../lib/FirebaseQueries'

import AppComponent from '../components/AppComponent'

const ApplicationPage = () => {
  // const { user } = useAuth() as authTypes

  // const navigate = useNavigate()
  // const [navOpen, setIsNavOpen] = useState(true)
  // const subColRef = collection(db, 'users', `${user?.uid}`, 'boards')
  // let snap = getDocs(subColRef).then((snap) => {
  //   console.log(snap.docs.map((d) => d.id)[0])
  // })

  //if user is not logged in, redirect to login page
  // useEffect(() => {
  //   if (!user?.uid) {
  //     navigate('login')
  //   }
  // }, [user])

  // const handleNavClick = (): void => {
  //   setIsNavOpen(!navOpen)
  // }

  // const items = [
  //   { name: 'Boards', content: ['Board 1', 'Board 2', 'Board 3', 'Board 4', 'Board 5', 'Board 6'] },
  // ]

  return (
    <>
      {/* Main App Section */}
      <>
        <div className={`flex min-h-screen grow bg-gray-300`}>
          <div className='mx-10 my-5 h-screen w-full rounded-md '>
            {/* <AppComponent />{' '} */}
          </div>
        </div>
        <Outlet />
      </>

      {/* End main container */}
    </>
  )
}

export default ApplicationPage
