/* eslint-disable react/prop-types */
import { DocumentData, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {
  addCard,
  addColumn,
  deleteCard,
  deleteColumn,
  updateCardContent,
  updateColumnName,
  updateColumnOrder,
  updateTaskIdsBetweenColumns,
  updateTasksSingleColumn,
} from '../lib/FirebaseQueries'

import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'
import MyModal from './Modal'
import { StrictModeDroppable } from './Droppable'
import { authTypes } from '../types/types'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'

const AppComponent = () => {
  const [boardState, setBoard] = useState<DocumentData>()
  const { user } = useAuth() as authTypes
  const [modalOpen, setModalOpen] = useState(false)

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

  function createColumn(colName: string) {
    addColumn(`${user?.uid}`, '7s9YSlDnF5RvIv2v4mnf', colName)
  }

  function deleteCol(colId: string) {
    deleteColumn(`${user?.uid}`, '7s9YSlDnF5RvIv2v4mnf', colId)
  }

  const columnList = boardState?.columnOrder.map((columnId: string, index: number) => {
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
        deleteCol={deleteCol}
        key={column.id}
        column={column}
        cards={tasks}
        index={index}
      />
    )
  })

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const start = source.droppableId
    const finish = destination.droppableId

    //Check where the task comes from
    const startColumn = boardState?.columns[source.droppableId]

    //Check where it finishes
    const finishColumn = boardState?.columns[destination.droppableId]

    if (startColumn === finishColumn && type === 'task') {
      const newList: string[] = Array.from(startColumn?.taskIds)
      newList.splice(source.index, 1)
      newList.splice(destination.index, 0, draggableId)
      updateTasksSingleColumn(`${user?.uid}`, '7s9YSlDnF5RvIv2v4mnf', start, newList)
    } else if (type === 'column') {
      const updateColOrder: string[] = Array.from(boardState?.columnOrder)
      updateColOrder.splice(source.index, 1)
      updateColOrder.splice(destination.index, 0, draggableId)
      updateColumnOrder(`${user?.uid}`, '7s9YSlDnF5RvIv2v4mnf', updateColOrder)
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
      <div className={`flex min-h-screen grow bg-gray-300`}>
        <div className='mx-10 my-5 h-screen w-full rounded-md '>
          <MyModal isOpen={modalOpen} setIsOpen={setModalOpen} createColumn={createColumn}>
            Add a column name
          </MyModal>
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId='columns' direction='horizontal' type='column'>
              {(provided) => (
                <>
                  <div>
                    <div {...provided.droppableProps} ref={provided.innerRef} className='m-5 flex'>
                      {columnList}

                      <div className=''>{provided.placeholder} </div>
                      <button
                        onClick={() => setModalOpen(true)}
                        className='flex-0 h-10 cursor-pointer whitespace-nowrap rounded-md bg-gray-400/20 px-5 py-1 text-blue-600 hover:bg-gray-400/40 active:translate-y-0.5'
                      >
                        Add Column +
                      </button>
                    </div>
                  </div>
                </>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </div>
      </div>
    </>
  )
}

export default AppComponent
