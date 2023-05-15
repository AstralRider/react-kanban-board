import { db } from './firebase'
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  deleteField,
  getDoc,
  deleteDoc,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

// add a column
export async function addColumn(uid: string, boardId: string, columnName?: string): Promise<void> {
  const newId = uuidv4()
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  const update = updateDoc(boardRef, {
    ['columns.' + newId]: {
      id: newId,
      title: 'The second column',
      cardIds: [],
    },
  })
  promiseHandler<void>(update)
}

//delete a column
export async function deleteColumn(uid: string, boardId: string, columnId: string): Promise<void> {
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  await updateDoc(boardRef, {
    ['columns.' + columnId]: deleteField(),
  })
}

// update a column name
export async function updateColumnName(
  uid: string,
  boardId: string,
  columnId: string,
  newName: string,
): Promise<void> {
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  await updateDoc(boardRef, {
    ['columns.' + columnId + '.title']: newName,
  })
}

//get a board
export async function getBoard(uid: string, boardId: string) {
  const ref = await getDoc(doc(db, 'users', uid, 'boards', boardId))
  const board = ref.data()
  return board
}

//add board
export async function addBoard(uid: string, boardName: string) {
  const collRef = doc(db, 'users', uid)
  await addDoc(collection(collRef, 'boards'), {
    boardName: boardName,
    cards: {},
    columns: {},
  })
}

//delete board
export async function deleteBoard(uid: string, boardId: string) {
  await deleteDoc(doc(db, 'users', uid, 'boards', boardId))
}

//update board name
export async function editBoardName(uid: string, boardId: string, name: string) {
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  await updateDoc(boardRef, {
    boardName: name,
  })
}

// delete card
//To do -> delete card from taskIds
export async function deleteCard(uid: string, boardId: string, cardId: string) {
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  await updateDoc(boardRef, {
    ['cards.' + cardId]: deleteField(),
  })
}

//add card
// To do -> add card to taskId's
export async function addCard(uid: string, boardId: string, content: string) {
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  const newId = uuidv4()
  await updateDoc(boardRef, {
    id: newId,
    ['cards.' + newId]: content,
  })
}

//update card content
export async function updateCardContent(
  uid: string,
  boardId: string,
  cardId: string,
  content: string,
) {
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  await updateDoc(boardRef, {
    ['cards.' + cardId]: content,
  })
}

export async function promiseHandler<T>(promise: Promise<T>) {
  let result
  let err
  try {
    result = await promise
  } catch (error: unknown) {
    if (error instanceof Error) {
      err = error.message
    }
  }
  return { result, err }
}
