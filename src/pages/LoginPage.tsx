import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { ImFacebook2 } from 'react-icons/im'

const LoginPage = () => {
  return (
    <div className='flex h-screen'>
      <div className='m-auto flex h-5/6 w-80 flex-col gap-16 overflow-hidden rounded-lg bg-gray-50 shadow-lg ring-1 ring-gray-200 sm:w-96'>
        {/* Header Section */}
        <div className='mt-10 flex items-center gap-x-4'>
          <div className='h-px flex-auto bg-gray-200'></div>
          <h4 className='text-md flex-none font-semibold leading-6 text-indigo-600'>Log in</h4>
          <div className='h-px flex-auto bg-gray-200'></div>
        </div>
        {/* End Header Section */}

        {/* Buttons Section */}
        <div className='flex h-60 flex-col justify-around px-14'>
          <button className='flex cursor-pointer items-center justify-center gap-x-3 rounded-md px-4 py-1 text-sm shadow-md outline outline-1 outline-gray-200 hover:bg-gray-100  active:translate-y-0.5 sm:text-base'>
            <FcGoogle className='text-lg' />
            Log in with Google
          </button>
          <button className='flex cursor-pointer items-center justify-center gap-x-2 rounded-md px-4 py-1 text-sm shadow-md outline outline-1 outline-gray-200 hover:bg-gray-100  active:translate-y-0.5 sm:text-base'>
            <ImFacebook2 className='text-lg text-blue-600' />
            Log in with Facebook
          </button>
          <button className='flex cursor-pointer items-center justify-center gap-x-3 rounded-md px-4 py-1 text-sm shadow-md outline outline-1 outline-gray-200 hover:bg-gray-100 active:translate-y-0.5 sm:text-base'>
            <AiFillGithub className='text-lg' />
            Log in with Github
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
