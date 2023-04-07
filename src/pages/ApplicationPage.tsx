import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authTypes } from '../types/types'
import { IoIosSettings } from 'react-icons/io'
import Button from '../components/Button'
import { RiMap2Fill } from 'react-icons/ri'
import SingleAccordion from '../components/Accordion'

const ApplicationPage = () => {
  const { user } = useAuth() as authTypes
  const navigate = useNavigate()

  //if user is not logged in, redirect to login page
  useEffect(() => {
    if (!user?.uid) {
      navigate('login')
    }
  }, [user])

  const items = [
    { name: 'Boards', content: ['Board 1', 'Board 2', 'Board 3', 'Board 4', 'Board 5', 'Board 6'] },
  ]

  return (
    <>
      <div className='gap flex'>
        {/* Side Nav */}
        <div className='min-h-screen w-64 flex-none bg-gray-200'>
          <div className='mt-5 flex flex-col gap-1'>
            <Button grey active className='mx-2.5 text-blue-500 hover:bg-gray-300'>
              <IoIosSettings /> {user?.displayName}
            </Button>
            <SingleAccordion items={items} />
          </div>
        </div>
        {/* End Side Nav */}

        {/* Main App Section */}
        <div className='min-h-screen grow bg-gray-300'></div>
      </div>
    </>
  )
}

export default ApplicationPage
