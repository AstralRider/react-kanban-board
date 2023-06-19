import { Outlet, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { getBoards, objType } from '../lib/FirebaseQueries'

import { BsArrowLeftCircle } from 'react-icons/bs'
import Button from '../components/Button'
import { IoIosSettings } from 'react-icons/io'
import SingleAccordion from '../components/Accordion'
import { authTypes } from '../types/types'
import { useAuth } from '../context/AuthContext'

const NavBar = () => {
  const [navOpen, setIsNavOpen] = useState(true)
  const [boardNames, setBoardNames] = useState<objType[] | undefined>()
  const [refetch, setRefetch] = useState<boolean>(false)
  const navigate = useNavigate()
  const { user, logOut } = useAuth() as authTypes

  useEffect(() => {
    setRefetch(false)
    const returnBoards = async () => {
      const res = await getBoards(`${user?.uid}`)
      setBoardNames(res)
    }

    returnBoards()
  }, [refetch])

  const handleNavClick = (): void => {
    setIsNavOpen(!navOpen)
  }

  const signUserOutFunction = () => {
    logOut()
    navigate('../login')
  }

  const fetch = (status: boolean, location?: string) => {
    setRefetch(status)
    location ? navigate(location) : null
  }

  const { id } = useParams()
  const boardId = id?.split('=')[1]

  return (
    <>
      <nav className='flex '>
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
            <SingleAccordion boardNames={boardNames} fetch={fetch} currentBoard={boardId} />
            <button onClick={signUserOutFunction}>Log out</button>
          </div>
        </div>
        <Outlet />
      </nav>
    </>
  )
}

export default NavBar
