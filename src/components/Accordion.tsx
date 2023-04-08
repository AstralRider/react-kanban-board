import { useState } from 'react'
import Button from './Button'
import { RiMap2Fill } from 'react-icons/ri'

type itemsType = {
  name: string
  content: string[]
}

const SingleAccordion = ({ items }: { items: itemsType[] }) => {
  const [isOpen, setIsopen] = useState<boolean>(false)

  const handleAccordionClick = (): void => {
    setIsopen(!isOpen)
  }

  const renderedList = items.map((item) => {
    return item.content.map((c, i) => {
      return (
        <p
          key={i}
          className='cursor-pointer rounded-md px-2.5 py-1 text-blue-600 hover:bg-gray-400 active:translate-y-0.5'
        >
          {c}
        </p>
      )
    })
  })

  return (
    <div
      className={` ${
        isOpen
          ? 'mx-2.5 w-11/12 min-w-[120px] rounded-md bg-gray-300'
          : 'mx-2.5 w-11/12 rounded-md delay-300 duration-500 ease-out'
      } `}
    >
      <Button
        onClick={handleAccordionClick}
        className={`w-full bg-transparent hover:bg-gray-300 ${
          isOpen ? 'w-full bg-gray-300 text-blue-600' : 'text-gray-600'
        }`}
        grey
      >
        <RiMap2Fill />
        Boards
      </Button>
      <div
        className={` w-full overflow-hidden rounded-md px-4 duration-300 ease-in ${
          isOpen ? 'max-h-80 bg-gray-300' : 'max-h-0 opacity-0 duration-300 ease-out'
        }`}
      >
        {renderedList}
      </div>
    </div>
  )
}

export default SingleAccordion
