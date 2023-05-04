export type columnType = {
  id: string
  title: string
  taskIds: string[]
}

export type Columns = {
  [key: string]: columnType
}

export type cardType = {
  id: string
  content: string
}

export type Cards = {
  [key: string]: cardType
}

export type Board = {
  name: string
  cards: Cards
  columns: Columns
  columnOrder: string[]
}

const board: Board = {
  name: "Create app to do's",
  cards: {
    'task-1': { id: 'task-1', content: 'Build this board' },
    'task-2': { id: 'task-2', content: 'Test this board' },
    'task-3': { id: 'task-3', content: 'Some content here' },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: "To do's for react kanban",
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'The second column',
      taskIds: ['task-3'],
    },
    'column-3': {
      id: 'column-3',
      title: 'The third column',
      taskIds: [],
    },
  },

  columnOrder: ['column-1', 'column-2', 'column-3'],
}

export default board
