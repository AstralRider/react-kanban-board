import { Droppable } from 'react-beautiful-dnd'
import { StrictModeDroppable } from './Droppable'
import { columnType, cardType } from '../dataModel'
import Task from './Task'

type cardArray = cardType[]

const Column = ({ column, cards }: { column: columnType; cards: cardArray }) => {
  return (
    <div className='h-full w-64 rounded-md bg-gray-100 shadow-md'>
      <div className='pt-2 text-center'>{column.title}</div>
      <StrictModeDroppable droppableId={column.id}>
        {(provided) => (
          <div className='m-2' ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((tasks, index) => (
              <Task key={tasks.id} index={index} task={tasks} />
            ))}
            <div className='mb-2' />
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  )
}

export default Column
