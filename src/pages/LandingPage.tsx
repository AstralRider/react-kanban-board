import { AiFillGithub } from 'react-icons/ai'

const LandingPage = () => {
  return (
    <div className='mx-auto flex h-screen items-center justify-center'>
      <div className=''>
        <div className='flex flex-col items-center justify-center py-56 '>
          <div className='flex max-w-3xl justify-center'>
            <div className='text-center font-sans text-3xl font-bold tracking-tight text-gray-700 sm:text-6xl'>
              A fully featured Kanban Board with{' '}
              <span className='bg-gradient-to-r from-sky-500 to-sky-300 bg-clip-text text-transparent'>
                React
              </span>{' '}
              and{' '}
              <span className='bg-gradient-to-r from-orange-500 to-yellow-300 bg-clip-text text-transparent'>
                Firebase
              </span>
            </div>
          </div>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <a
              href='#'
              className='rounded-md bg-gradient-to-r from-orange-500 to-yellow-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm'
            >
              Login to get started
            </a>
            <a
              href='#'
              className='flex gap-x-1 rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-700 outline outline-gray-400'
            >
              View the code
              <span className='flex items-center' aria-hidden='true'>
                <AiFillGithub />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
