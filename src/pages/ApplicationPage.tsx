import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { useAuth } from '../context/AuthContext'
import { authTypes } from '../types/types'
import { IoIosSettings } from 'react-icons/io'
import Button from '../components/Button'
import SingleAccordion from '../components/Accordion'
import { BsArrowLeftCircle } from 'react-icons/bs'
import board from '../dataModel'
import Column from '../components/Column'

const ApplicationPage = () => {
  const { user } = useAuth() as authTypes
  const navigate = useNavigate()
  const [navOpen, setIsNavOpen] = useState<boolean>(true)
  const [boardState, setBoard] = useState<typeof board>(board)

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

  function updateTasks(id: string, value: string): void {
    const cards = boardState.cards

    setBoard((boardState) => {
      return {
        ...boardState,
        cards: {
          ...boardState.cards,
          [id]: { id, content: value },
        },
      }
    })
  }

  const columnList = boardState.columnOrder.map((columnId) => {
    const column = boardState.columns[columnId]

    const tasks = column.taskIds?.map((taskId: string) => {
      return boardState.cards[taskId]
    })

    return <Column updateTasks={updateTasks} key={column.id} column={column} cards={tasks} />
  })

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    //Check where the task comes from
    const startColumn = boardState.columns[source.droppableId]
    //Check where it finishes
    const finishColumn = boardState.columns[destination.droppableId]

    if (startColumn === finishColumn) {
      const newList = Array.from(startColumn.taskIds)
      newList.splice(source.index, 1)
      newList.splice(destination.index, 0, draggableId)

      const newColumn = { ...startColumn, taskIds: newList }

      const updatedState = {
        ...boardState,
        columns: {
          ...boardState.columns,
          [source.droppableId]: newColumn,
        },
      }

      setBoard(updatedState)
      return
    } else {
      const startIds = Array.from(startColumn.taskIds)
      startIds.splice(source.index, 1)

      const finishIds = Array.from(finishColumn.taskIds)
      finishIds.splice(destination.index, 0, draggableId)

      const updatedStartCol = { ...startColumn, taskIds: startIds }
      const updatedFinishCol = { ...finishColumn, taskIds: finishIds }

      const updatedState = {
        ...boardState,
        columns: {
          ...boardState.columns,
          [source.droppableId]: updatedStartCol,
          [destination.droppableId]: updatedFinishCol,
        },
      }

      setBoard(() => updatedState)
    }
  }

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
          <div className='mx-10 my-5 h-screen w-full rounded-md '>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className='m-5 flex gap-4'>{columnList}</div>
            </DragDropContext>
          </div>
        </div>
      </div>
      {/* End main container */}
    </>
  )
}

export default ApplicationPage
