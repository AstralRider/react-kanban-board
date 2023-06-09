import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'

import { db } from './firebase'
import { v4 as uuidv4 } from 'uuid'

// add a column
export async function addColumn(uid: string, boardId: string, columnName: string): Promise<void> {
  const batch = writeBatch(db)
  const newId = uuidv4()
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  batch.update(boardRef, {
    ['columns.' + newId]: {
      id: newId,
      title: columnName,
      taskIds: [],
    },
  })
  batch.update(boardRef, {
    columnOrder: arrayUnion(newId),
  })
  await batch.commit()
}

//delete a column
export async function deleteColumn(uid: string, boardId: string, columnId: string): Promise<void> {
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  const docSnap = await getDoc(boardRef)
  const ids = docSnap.get('columns.' + columnId + '.taskIds')
  //add if check if col has no tasks in it
  if (ids.length != 0) {
    const batch = writeBatch(db)
    ids.map(async (id: string) => {
      batch.update(boardRef, {
        ['cards.' + id]: deleteField(),
      })
      batch.update(boardRef, {
        ['columns.' + columnId]: deleteField(),
      })
      batch.update(boardRef, {
        columnOrder: arrayRemove(columnId),
      })
    })
    //move commit outside loop otherwise batch is trying to be called multiple times
    promiseHandler(batch.commit())
  } else {
    //if the col has no tasks inside it
    const batch = writeBatch(db)
    batch.update(boardRef, {
      ['columns.' + columnId]: deleteField(),
    })
    batch.update(boardRef, {
      columnOrder: arrayRemove(columnId),
    })
    promiseHandler(batch.commit())
  }
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

//update col order for horizontal dragging
export async function updateColumnOrder(uid: string, boardId: string, newColOrder: string[]) {
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  await updateDoc(boardRef, {
    columnOrder: newColOrder,
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

//get boards obj
export async function getBoards(uid: string) {
  const { result } = await promiseHandler(getDocs(collection(db, 'users', uid, 'boards')))
  const obj: objType = {}
  const arr: objType[] = []
  result?.forEach((doc) => {
    const id: string = doc.id
    const name: string = doc.get('boardName')
    obj[id] = { id: id, name: name }
  })
  arr.push(obj)
  return arr
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
export async function deleteCard(uid: string, boardId: string, cardId: string, colId: string) {
  const batch = writeBatch(db)
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  batch.update(boardRef, { ['cards.' + cardId]: deleteField() })
  batch.update(boardRef, {
    ['columns.' + colId + '.taskIds']: arrayRemove(cardId),
  })
  await batch.commit()
}

//add card
// To do -> add card to taskId's
export async function addCard(uid: string, boardId: string, content: string, colId: string) {
  const batch = writeBatch(db)
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  const newId = uuidv4()
  batch.update(boardRef, {
    ['cards.' + newId]: {
      id: newId,
      content: content,
    },
  })
  batch.update(boardRef, {
    ['columns.' + colId + '.taskIds']: arrayUnion(newId),
  })
  await batch.commit()
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
    ['cards.' + cardId + '.content']: content,
  })
}

export async function updateTaskIdsBetweenColumns(
  uid: string,
  boardId: string,
  startId: string,
  startColumn: string[],
  endId: string,
  endColumn: string[],
) {
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  await updateDoc(boardRef, {
    ['columns.' + startId + '.taskIds']: startColumn,
    ['columns.' + endId + '.taskIds']: endColumn,
  })
}

export async function updateTasksSingleColumn(
  uid: string,
  boardId: string,
  columnId: string,
  newCol: string[],
) {
  const boardRef = doc(db, 'users', uid, 'boards', boardId)
  await updateDoc(boardRef, {
    ['columns.' + columnId + '.taskIds']: newCol,
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
      console.log('Error message: ' + err)
    }
  }

  return { result, err }
}

export type objType = {
  [key: string]: {
    id: string
    name: string
  }
}
