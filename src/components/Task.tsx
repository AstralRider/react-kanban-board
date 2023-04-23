import { Draggable } from 'react-beautiful-dnd'
import { useState, useRef } from 'react'
import { cardType } from '../dataModel'
const Task = ({
  task,
  index,
  updateTasks,
}: {
  task: cardType
  index: number
  updateTasks: (id: string, updatedContent: string) => void
}) => {
  const [editing, setEditing] = useState()

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          onClick={() => updateTasks(task.id, 'string')}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`mb-2 rounded-sm bg-gray-100 py-1 px-3 text-sm shadow-md outline outline-2 outline-gray-400`}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  )
}

export default Task
