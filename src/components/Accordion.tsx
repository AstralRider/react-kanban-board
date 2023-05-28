import { NavLink, useParams } from 'react-router-dom'
import React, { useState } from 'react'

import Button from './Button'
import { RiMap2Fill } from 'react-icons/ri'

type itemsType = {
  [key: string]: { id: string; name: string }
}

const SingleAccordion = ({ items }: { items: itemsType[] }) => {
  const [isOpen, setIsopen] = useState<boolean>(false)

  const handleAccordionClick = (): void => {
    setIsopen(!isOpen)
  }

  const { id } = useParams()

  const list = items.flatMap((x) => {
    return Object.values(x)
  })

  const renderedList = list.map((x) => {
    return (
      <NavLink
        to={`app/${x.id}`}
        key={x.id}
        className='flex shrink-0 grow-0 cursor-pointer overflow-hidden whitespace-nowrap rounded-md px-2.5 py-1 text-blue-600 hover:bg-gray-400/40 active:translate-y-0.5'
      >
        {x.name}
      </NavLink>
    )
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
        className={` w-full overflow-hidden rounded-md px-4 py-2 duration-300 ease-in ${
          isOpen
            ? 'max-h-80 bg-gray-300'
            : 'max-h-0 overflow-hidden opacity-0 duration-300 ease-out'
        }`}
      >
        {renderedList}
      </div>
    </div>
  )
}

export default SingleAccordion
