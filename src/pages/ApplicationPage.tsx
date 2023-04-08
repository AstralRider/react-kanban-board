import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authTypes } from '../types/types'
import { IoIosSettings } from 'react-icons/io'
import Button from '../components/Button'
import SingleAccordion from '../components/Accordion'
import { BsArrowLeftCircle } from 'react-icons/bs'
import Board from '../dataModel'
import Column from '../components/Column'

const ApplicationPage = () => {
  const { user } = useAuth() as authTypes
  const navigate = useNavigate()
  const [navOpen, setIsNavOpen] = useState<boolean>(true)
  const [board, setBoard] = useState<typeof Board>(Board)

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

  const columnList = board.columnOrder.map((columnId) => {
    const column = board.columns[columnId]
    const tasks = column.taskIds.map((taskId) => board.cards[taskId])

    console.log(tasks)

    return <Column key={column.id} column={column} cards={tasks} />
  })

  return (
    <>
      <div className='flex'>
        {/* Side Nav */}
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
          <div className='mx-10 my-10 flex h-screen w-full rounded-md bg-gray-200'>
            <div className='m-5'>{columnList}</div>
          </div>
        </div>
      </div>
      {/* End main container */}
    </>
  )
}

export default ApplicationPage
