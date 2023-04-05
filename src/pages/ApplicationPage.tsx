import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authTypes } from '../types/types'
import { IoIosSettings } from 'react-icons/io'
import Button from '../components/Button'
import { RiMap2Fill } from 'react-icons/ri'

const ApplicationPage = () => {
  const { user } = useAuth() as authTypes
  const navigate = useNavigate()
  const [isOpen, setIsopen] = useState<boolean>(true)

  //if user is not logged in, redirect to login page
  useEffect(() => {
    if (!user?.uid) {
      navigate('login')
    }
  }, [user])

  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])

  const handleAccordionClick = (): void => {
    setIsopen(!isOpen)
  }

  const listData = ['Lorem Ipsum', 'Board 2', 'Board 3', 'Board 4']

  const renderedList = listData.map((data, idx) => {
    return (
      <p className='py-0.5 text-blue-500' key={idx}>
        {data}
      </p>
    )
  })

  return (
    <>
      <div className='gap flex'>
        <div className='min-h-screen w-64 flex-none bg-gray-200'>
          <div className='mt-5 flex flex-col'>
            <Button grey active className='mx-2.5 text-blue-500 hover:bg-gray-300'>
              <IoIosSettings /> {user?.displayName}
            </Button>
            <Button
              onClick={handleAccordionClick}
              grey
              className='mx-2.5 text-blue-500 hover:bg-gray-300'
            >
              <RiMap2Fill />
              Boards
            </Button>
            <div
              className={`mx-2.5 overflow-hidden rounded-md bg-gray-300 px-8 duration-700 ease-in-out ${
                isOpen ? 'max-h-40 ' : 'max-h-0'
              }`}
            >
              {renderedList}
            </div>
          </div>
        </div>
        <div className='min-h-screen grow bg-gray-300'></div>
      </div>
    </>
  )
}

export default ApplicationPage
