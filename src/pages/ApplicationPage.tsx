import { DocumentData, doc, onSnapshot } from 'firebase/firestore'
import {
  addBoard,
  addCard,
  addColumn,
  deleteBoard,
  deleteCard,
  deleteColumn,
  editBoardName,
  getBoard,
  updateCardContent,
  updateColumnName,
  updateTaskIdsBetweenColumns,
  updateTasksSingleColumn,
} from '../lib/firebaseQueries'
import { useEffect, useState } from 'react'

import { BsArrowLeftCircle } from 'react-icons/bs'
import Button from '../components/Button'
import Column from '../components/Column'
import { DragDropContext } from 'react-beautiful-dnd'
import { IoIosSettings } from 'react-icons/io'
import SingleAccordion from '../components/Accordion'
import { authTypes } from '../types/types'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ApplicationPage = () => {
  const { user } = useAuth() as authTypes

  const navigate = useNavigate()
  const [navOpen, setIsNavOpen] = useState(true)
  const [boardState, setBoard] = useState<DocumentData>()

  // const subColRef = collection(db, 'users', `${user?.uid}`, 'boards')
  // let snap = getDocs(subColRef).then((snap) => {
  //   console.log(snap.docs.map((d) => d.id)[0])
  // })

  useEffect(() => {
    const snapshot = onSnapshot(
      doc(db, 'users', `${user?.uid}`, 'boards', '7s9YSlDnF5RvIv2v4mnf'),
      (doc) => {
        setBoard(doc.data())
      },
    )

    return () => {
      snapshot()
    }
  }, [])

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
    updateCardContent(`${user?.uid}`, '7s9YSlDnF5RvIv2v4mnf', id, value)
  }

  function deleteTasks(cardId: string, colId: string) {
    deleteCard(`${user?.uid}`, '7s9YSlDnF5RvIv2v4mnf', cardId, colId)
  }

  function addTasks(colId: string, content: string) {
    addCard(`${user?.uid}`, '7s9YSlDnF5RvIv2v4mnf', content, colId)
  }

  function updateColName(colId: string, content: string) {
    updateColumnName(`${user?.uid}`, '7s9YSlDnF5RvIv2v4mnf', colId, content)
  }

  const columnList = boardState?.columnOrder.map((columnId: string) => {
    const column = boardState.columns[columnId]
    const tasks = column.taskIds?.map((taskId: string) => {
      return boardState.cards[taskId]
    })

    return (
      <Column
        deleteTasks={deleteTasks}
        updateTasks={updateTasks}
        addTasks={addTasks}
        updateColName={updateColName}
        key={column.id}
        column={column}
        cards={tasks}
      />
    )
  })

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const start = source.droppableId
    const finish = destination.droppableId
    //Check where the task comes from
    const startColumn = boardState?.columns[source.droppableId]
    //Check where it finishes
    const finishColumn = boardState?.columns[destination.droppableId]
    if (startColumn === finishColumn) {
      const newList: string[] = Array.from(startColumn.taskIds)
      newList.splice(source.index, 1)
      newList.splice(destination.index, 0, draggableId)

      updateTasksSingleColumn(`${user?.uid}`, '7s9YSlDnF5RvIv2v4mnf', start, newList)
      return
    } else {
      const startIds: string[] = Array.from(startColumn.taskIds)
      startIds.splice(source.index, 1)

      const finishIds: string[] = Array.from(finishColumn.taskIds)
      finishIds.splice(destination.index, 0, draggableId)

      updateTaskIdsBetweenColumns(
        `${user?.uid}`,
        '7s9YSlDnF5RvIv2v4mnf',
        start,
        startIds,
        finish,
        finishIds,
      )
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
              <div className='m-5 flex gap-4'>
                {columnList}
                <div>Add Col</div>
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
      {/* End main container */}
    </>
  )
}

export default ApplicationPage
