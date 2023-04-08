export type columnType = {
  id: string
  title: string
  taskIds: string[]
}

type Columns = {
  [key: string]: columnType
}

export type cardType = {
  id: string
  content: string
}

type Cards = {
  [key: string]: cardType
}

type Board = {
  name: string
  cards: Cards
  columns: Columns
  columnOrder: string[]
}

const Board: Board = {
  name: "Create app to do's",
  cards: {
    'task-1': { id: 'task-1', content: 'Build this board' },
    'task-2': { id: 'task-2', content: 'Test this board' },
    'task-3': { id: 'task-1', content: 'Deploy this board on the internet' },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: "To do's for react kanban",
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
  },

  columnOrder: ['column-1'],
}

export default Board
