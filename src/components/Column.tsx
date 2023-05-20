import { Droppable } from 'react-beautiful-dnd'
import { IoMdAdd } from 'react-icons/io'
import { StrictModeDroppable } from './Droppable'
import { columnType, cardType } from '../dataModel'
import Task from './Task'

type cardArray = cardType[]

const Column = ({
  column,
  cards,
  updateTasks,
  deleteTasks,
}: {
  column: columnType
  cards: cardArray
  updateTasks: (id: string, updatedContent: string) => void
  deleteTasks: (cardId: string, colId: string) => void
}) => {
  return (
    <div className='h-fit w-80 rounded-md bg-gray-100  shadow-md'>
      <div className='pt-2 text-center'>{column.title}</div>
      <StrictModeDroppable droppableId={column.id}>
        {(provided) => (
          <div className='m-2' ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((tasks, index) => (
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
      <div className='mt-5 flex h-10 items-center justify-center gap-2 rounded-md bg-gray-200 hover:cursor-pointer hover:bg-gray-300'>
        <p className='italic text-gray-500'>Add Card</p>
        <IoMdAdd className='italic text-gray-500' />
      </div>
    </div>
  )
}

export default Column
