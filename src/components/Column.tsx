import { cardType, columnType } from '../dataModel'

import { AiOutlineEdit } from 'react-icons/ai'
import { Draggable } from 'react-beautiful-dnd'
import { FiTrash2 } from 'react-icons/fi'
import { IoMdAdd } from 'react-icons/io'
import Modal from './Modal'
import { StrictModeDroppable } from './Droppable'
import Task from './Task'
import { useState } from 'react'

type cardArray = cardType[]

const Column = ({
  column,
  cards,
  updateTasks,
  deleteTasks,
  addTasks,
  deleteCol,
  updateColName,
  index,
}: {
  column: columnType
  cards: cardArray
  updateTasks: (id: string, updatedContent: string) => void
  deleteTasks: (cardId: string, colId: string) => void
  addTasks: (colId: string, content: string) => void
  updateColName: (colId: string, content: string) => void
  deleteCol: (colId: string) => void
  index: number
}) => {
  let [isOpen, setIsOpen] = useState(false)
  let [header, setHeader] = useState(false)
  function openModal() {
    setIsOpen(true)
  }
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className='mx-2 h-fit w-80 rounded-md bg-gray-100 shadow-md'
        >
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} colId={column.id} addTasks={addTasks}>
            Add a Card
          </Modal>
          <div
            {...provided.dragHandleProps}
            className='mb-3 flex items-center justify-center gap-2 rounded-md pt-2'
          >
            <div className='flex w-9/12 text-center text-sm font-bold'>{column.title}</div>
            <div className=' flex w-2/12 justify-end gap-1.5 text-lg'>
              <FiTrash2
                onClick={() => deleteCol(column.id)}
                className='hover:cursor-pointer hover:text-blue-600'
              />
              <AiOutlineEdit
                onClick={() => setHeader(true)}
                className='hover:cursor-pointer hover:text-blue-600'
              />
            </div>
            <Modal
              isOpen={header}
              setIsOpen={setHeader}
              colId={column.id}
              updateColName={updateColName}
            >
              Update Column Title
            </Modal>
          </div>
          <StrictModeDroppable droppableId={column.id} type='tasks'>
            {(provided) => (
              <div className='m-2' ref={provided.innerRef} {...provided.droppableProps}>
                {cards?.map((tasks, index) => (
                  <Task
                    key={tasks.id}
                    index={index}
                    task={tasks}
                    updateTasks={updateTasks}
                    deleteTasks={deleteTasks}
                    colId={column.id}
                  />
                ))}

                <div className='mb-2' />
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
          <div
            onClick={openModal}
            className='mt-5 flex h-10 items-center justify-center gap-2 rounded-md bg-gray-200 hover:cursor-pointer hover:bg-gray-300'
          >
            <p className='italic text-gray-500'>Add Card</p>
            <IoMdAdd className='italic text-gray-500' />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Column
