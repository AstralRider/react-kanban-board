import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import React from 'react'

export default function MyModal({
  isOpen,
  setIsOpen,
  colId,
  addTasks,
  updateColName,
  createColumn,
  children,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  colId?: string
  addTasks?: (colId: string, content: string) => void
  updateColName?: (colId: string, content: string) => void
  createColumn?: (colName: string) => void
  children: React.ReactNode
}) {
  const [content, setContent] = useState<string>('')
  const [error, setError] = useState(true)

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(event.currentTarget.value)
    if (event.currentTarget.value === '') {
      setError(true)
    } else {
      setError(false)
    }
  }

  const save = () => {
    if (addTasks) {
      addTasks(colId!, content)
    } else if (updateColName) {
      updateColName(colId!, content)
    } else if (createColumn) {
      createColumn(content)
    }
    setIsOpen(false)
    setContent('')
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog open={isOpen} as='div' className='relative z-10' onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    {children}
                  </Dialog.Title>
                  <div className='mt-2'>
                    <textarea
                      value={content}
                      onChange={onChangeHandler}
                      className='w-11/12 resize-none rounded-md p-1 text-sm text-gray-700 outline outline-2 outline-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1'
                      rows={5}
                      placeholder='Add your text here!'
                    />
                  </div>
                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={save}
                      disabled={error ? true : false}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
