/* eslint-disable react/prop-types */
import { DocumentData, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { addBoard, deleteBoard, editBoardName, getBoard } from '../lib/FirebaseQueries'

import AppComponent from '../components/AppComponent'
import { BsArrowLeftCircle } from 'react-icons/bs'
import Button from '../components/Button'
import { IoIosSettings } from 'react-icons/io'
import SingleAccordion from '../components/Accordion'
import { authTypes } from '../types/types'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ApplicationPage = () => {
  const { user } = useAuth() as authTypes

  const navigate = useNavigate()
  const [navOpen, setIsNavOpen] = useState(true)
  // const subColRef = collection(db, 'users', `${user?.uid}`, 'boards')
  // let snap = getDocs(subColRef).then((snap) => {
  //   console.log(snap.docs.map((d) => d.id)[0])
  // })

  //if user is not logged in, redirect to login page
  useEffect(() => {
    if (!user?.uid) {
      navigate('login')
    }
  }, [user])

  const handleNavClick = (): void => {
    setIsNavOpen(!navOpen)
  }

  const items = [
    { name: 'Boards', content: ['Board 1', 'Board 2', 'Board 3', 'Board 4', 'Board 5', 'Board 6'] },
  ]

  return (
    <>
      <div className='flex'>
        <div
          className={`duration-500 ${
            navOpen ? 'relative min-h-screen w-64 flex-none bg-gray-200' : 'w-0 grow-0 ease-out'
          }`}
        >
          <BsArrowLeftCircle
            onClick={handleNavClick}
            className={`${
              navOpen
                ? 'absolute top-12 left-[245px]'
                : 'absolute top-12 left-[-5px] rotate-180 overflow-hidden'
            } absolute z-10 cursor-pointer select-none rounded-full bg-gray-200 text-2xl text-gray-600 shadow-lg duration-500  hover:scale-125`}
          />

          <div className='mt-5 flex flex-col gap-1'>
            <Button active className='mx-2.5 text-blue-500 hover:bg-gray-300'>
              <IoIosSettings /> {user?.displayName}
            </Button>
            <SingleAccordion items={items} />
          </div>
        </div>
        {/* End Side Nav */}

        {/* Main App Section */}

        <div className={`flex min-h-screen grow bg-gray-300`}>
          <div className='mx-10 my-5 h-screen w-full rounded-md '>
            <AppComponent />
          </div>
        </div>
      </div>
      {/* End main container */}
    </>
  )
}

export default ApplicationPage
