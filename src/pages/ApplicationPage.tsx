import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authTypes } from '../types/types'
import { IoIosSettings } from 'react-icons/io'
import Button from '../components/Button'

const ApplicationPage = () => {
  const { user } = useAuth() as authTypes
  const navigate = useNavigate()

  //if user is not logged in, redirect to login page
  useEffect(() => {
    if (!user?.uid) {
      navigate('login')
    }
  }, [user])

  return (
    <>
      <div className='gap flex'>
        <div className='min-h-screen w-64 flex-none  bg-gray-50'>
          <div className='mt-5 flex flex-col'>
            <Button subtle active className='hover:bg-slate-200'>
              <IoIosSettings /> {user?.displayName}
            </Button>
            {/* <button className='mx-4 flex h-8 items-center gap-2 rounded-md bg-slate-50 hover:bg-slate-200'>
              <span>
                <IoIosSettings />
              </span>
              <span>{user?.displayName}</span>
            </button> */}

            <button className='mx-4 flex h-8 items-center gap-2 rounded-md bg-slate-50 hover:bg-slate-200'>
              <p className='pl-8'>{user?.email}</p>
            </button>
          </div>
        </div>
        <div className='min-h-screen grow bg-gray-300'>Application Shell</div>
      </div>
    </>
  )
}

export default ApplicationPage
