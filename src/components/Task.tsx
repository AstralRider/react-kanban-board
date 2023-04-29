import { Draggable } from 'react-beautiful-dnd'
import React, { useState, useRef, useEffect } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
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
  const [content, setContent] = useState<string>(task.content)
  const [showTextArea, setShowTextArea] = useState(false)

  const editableTextAreaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    editableTextAreaRef.current?.addEventListener('focusout', (event: FocusEvent) => {
      setShowTextArea(false)
    })

    return () => {
      editableTextAreaRef.current?.removeEventListener('focusout', (event: FocusEvent) => {
        setShowTextArea(false)
      })
      console.log('Cleaning up')
    }
  }, [showTextArea])

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void =>
    setContent(event.currentTarget.value)

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.currentTarget.blur()
    }
  }

  const focusTextArea = (): void => {
    editableTextAreaRef.current?.focus()
    setShowTextArea(true)
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          // onClick={() => updateTasks(task.id, 'string')}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`relative mb-2 h-fit rounded-sm bg-gray-100 py-2 px-2 text-sm shadow-md outline outline-2 outline-gray-400 hover:bg-gray-200`}
        >
          <div className='absolute right-1 rounded-md text-lg  hover:scale-125 hover:bg-gray-200 hover:text-blue-600 '>
            <AiOutlineEdit onClick={focusTextArea} className='' />
          </div>
          {showTextArea ? (
            <textarea
              onChange={onChangeHandler}
              onKeyDown={onKeyDown}
              value={content}
              className='text-area h-fit w-11/12 resize-none bg-gray-100 text-justify'
              rows={1}
              id='text'
              ref={editableTextAreaRef}
              autoFocus
            />
          ) : (
            <p className='w-11/12 text-justify'>{task.content}</p>
          )}
        </div>
      )}
    </Draggable>
  )
}

export default Task
