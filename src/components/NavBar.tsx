import React, { useState } from 'react'

import { BsArrowLeftCircle } from 'react-icons/bs'
import Button from '../components/Button'
import { IoIosSettings } from 'react-icons/io'
import { Outlet } from 'react-router-dom'
import SingleAccordion from '../components/Accordion'
import { authTypes } from '../types/types'
import { useAuth } from '../context/AuthContext'

const NavBar = () => {
  const [navOpen, setIsNavOpen] = useState(true)
  const handleNavClick = (): void => {
    setIsNavOpen(!navOpen)
  }

  const { user } = useAuth() as authTypes
  //prettier-ignore
  const items = [
    {
      '7s9YSlDnF5RvIv2v4mnf': { id: '7s9YSlDnF5RvIv2v4mnf', name: 'My first board' },
      'lqC49lZhw4dpj4Q5nfwq': { id: 'lqC49lZhw4dpj4Q5nfwq', name: 'My second board' },
    },
  ]

  return (
    <>
      <div className='flex overflow-hidden'>
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

          <div className='mt-5 flex flex-col gap-1 overflow-hidden'>
            <Button active className='z-0 mx-2.5 text-blue-500 hover:bg-gray-300'>
              <IoIosSettings /> {user?.displayName}
            </Button>
            <SingleAccordion items={items} />
          </div>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default NavBar
