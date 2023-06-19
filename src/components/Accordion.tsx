import React, { useState } from 'react'
import { addBoard, deleteBoard } from '../lib/FirebaseQueries'

import Button from './Button'
import { FiTrash2 } from 'react-icons/fi'
import MyModal from './Modal'
import { NavLink } from 'react-router-dom'
import { RiMap2Fill } from 'react-icons/ri'
import { authTypes } from '../types/types'
import { useAuth } from '../context/AuthContext'

type boardType = {
  [key: string]: {
    id: string
    name: string
  }
}

const SingleAccordion = ({
  boardNames,
  fetch,
  currentBoard,
}: {
  boardNames: boardType[] | undefined
  fetch: (status: boolean, location?: string) => void
  currentBoard: string | undefined
}) => {
  const [isOpen, setIsopen] = useState<boolean>(false)
  const { user } = useAuth() as authTypes
  const [modalOpen, setModalOpen] = useState(false)

  const handleAccordionClick = (): void => {
    setIsopen(!isOpen)
  }

  let list

  if (boardNames) {
    list = boardNames?.flatMap((x) => {
      return Object.values(x)
    })
  }

  const baseNavStyle =
    'flex shrink-0 grow-0 cursor-pointer overflow-hidden whitespace-nowrap rounded-md px-2.5 py-1  hover:bg-gray-400/40 active:translate-y-0.5 items-center justify-between basis-10/12'

  let renderedList

  const removeBoard = async (boardId: string) => {
    await deleteBoard(`${user?.uid}`, boardId)
    if (currentBoard === boardId) {
      return fetch(true, '/app')
    } else {
      return fetch(true)
    }
  }

  const createBoard = async (boardName: string) => {
    await addBoard(`${user?.uid}`, boardName)
    fetch(true)
  }

  if (list) {
    renderedList = list.map((board) => {
      return (
        <div className='relative flex items-center' key={board.id}>
          <NavLink
            to={`id=${board.id}`}
            key={board.id}
            className={({ isActive }) =>
              isActive ? `${baseNavStyle} + text-blue-600` : `${baseNavStyle} + text-gray-600`
            }
            end
            state={{ locationId: board.id }}
          >
            <p className='overflow-hidden text-ellipsis'>{board.name}</p>
          </NavLink>
          <FiTrash2
            className='absolute right-0 basis-2/12 hover:scale-125'
            onClick={() => removeBoard(board.id)}
          />
        </div>
      )
    })
  }

  return (
    <>
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
          className={` w-full  overflow-y-auto rounded-md px-4 py-2 duration-500 ease-in ${
            isOpen
              ? 'max-h-80 bg-gray-300 duration-500'
              : 'max-h-0 overflow-hidden opacity-0 duration-500 ease-out'
          }`}
        >
          {renderedList}
          <MyModal isOpen={modalOpen} setIsOpen={setModalOpen} createBoard={createBoard}>
            Name your new board!
          </MyModal>
          <Button
            onClick={() => setModalOpen(true)}
            className='px-2.5 py-1 text-left text-gray-500 hover:bg-gray-400/40'
          >
            Add a board +
          </Button>
        </div>
      </div>
    </>
  )
}

export default SingleAccordion
