import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'

const Login = () => {
  return (
    <div className=' bg-white rounded-md'>
      <div className='flex flex-col space-y-4 justify-center items-center w-[450px] h-72 bg-white rounded-lg outline outline-1 outline-gray-300 shadow-xl'>
        <a className='rounded-md font-semibold shadow-md px-4 py-1 outline outline-1 outline-gray-200 hover:bg-gray-100 cursor-pointer flex gap-x-2 items-center active:translate-y-0.5'>
          <FcGoogle className='text-lg' />
          Log in with Google
        </a>
        <a className='rounded-md font-semibold shadow-md px-4 py-1 outline outline-1 outline-gray-200 hover:bg-gray-100 flex gap-x-2 items-center cursor-pointer active:translate-y-0.5'>
          <AiFillGithub className='text-lg' />
          Log in with Github
        </a>
      </div>
    </div>
  )
}

export default Login
