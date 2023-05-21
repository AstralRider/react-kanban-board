import { Draggable } from 'react-beautiful-dnd'
import React, { useState, useRef, useEffect } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'
import { RxCross2, RxCheck } from 'react-icons/rx'
import { cardType } from '../dataModel'

const Task = ({
  task,
  index,
  updateTasks,
  colId,
  deleteTasks,
}: {
  task: cardType
  index: number
  updateTasks: (id: string, updatedContent: string) => void
  deleteTasks: (cardId: string, colId: string) => void
  colId: string
}) => {
  const [content, setContent] = useState<string>(task.content)
  const [showTextArea, setShowTextArea] = useState(false)
  const [error, setError] = useState(false)

  const editableTextAreaRef = useRef<HTMLTextAreaElement | null>(null)

  const taskRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (taskRef.current && !taskRef.current.contains(event.target as Node)) {
        editableTextAreaRef.current?.blur()
        setShowTextArea(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [taskRef])

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(event.currentTarget.value)
    event.currentTarget.value ? setError(false) : setError(true)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.currentTarget.blur()
    }
  }

  const focusTextArea = (): void => {
    editableTextAreaRef.current?.focus()
    setShowTextArea(true)
  }

  const autoResizeTextarea = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto'
    element.style.height = element.scrollHeight + 'px'
  }

  const updateText = (id: string, content: string): void => {
    //handle no characters error
    if (error === false) {
      updateTasks(task.id, content)
      editableTextAreaRef.current?.blur()
      setShowTextArea(false)
    }
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div ref={taskRef}>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`relative mb-2 h-fit rounded-sm bg-gray-100 py-2 px-2 text-sm shadow-lg outline outline-2 outline-gray-400 hover:bg-gray-200`}
          >
            <div className=''>
              <div className='absolute right-1 rounded-md text-lg  hover:scale-125 hover:bg-gray-200 hover:text-blue-600 '>
                <AiOutlineEdit onClick={focusTextArea} className='' />
              </div>
              <div className='absolute right-6 rounded-md text-lg  hover:scale-110 hover:bg-gray-200 hover:text-blue-600 '>
                <FiTrash2 className='' onClick={() => deleteTasks(task.id, colId)} />
              </div>
              {showTextArea ? (
                <textarea
                  onChange={onChangeHandler}
                  onKeyDown={onKeyDown}
                  value={content}
                  className='text-area relative h-fit w-10/12 resize-none  bg-gray-100 px-2 text-justify '
                  rows={1}
                  autoFocus
                  id='text'
                  ref={(textarea) => {
                    if (textarea) autoResizeTextarea(textarea)
                    editableTextAreaRef.current = textarea
                  }}
                />
              ) : (
                <div className='min-h-12 w-10/12 whitespace-normal px-2 text-justify'>
                  {task.content}
                </div>
              )}
            </div>
          </div>
          {showTextArea ? (
            <span className='mb-3 flex justify-end gap-1'>
              <a
                className={
                  error
                    ? `rounded-sm outline outline-2 outline-gray-400 drop-shadow-lg hover:cursor-not-allowed`
                    : `rounded-sm outline outline-2 outline-gray-400 drop-shadow-lg transition duration-100 hover:scale-110 hover:cursor-pointer hover:text-blue-600 hover:outline-blue-600`
                }
                onClick={() => updateText(task.id, content)}
              >
                <RxCheck />
              </a>
              <a className='rounded-sm outline outline-2 outline-gray-400 drop-shadow-lg transition duration-100 hover:scale-110 hover:cursor-pointer hover:text-blue-600 hover:outline-blue-600'>
                <RxCross2 onClick={() => setShowTextArea(false)} />
              </a>
            </span>
          ) : null}
        </div>
      )}
    </Draggable>
  )
}

export default Task
