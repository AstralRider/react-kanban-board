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
    'task-4': { id: 'task-4', content: 'Test this board' },
    'task-3': {
      id: 'task-3',
      content:
        'Deploy this board on the internet for the world to see. Just adding more text here to see what it looks like.Deploy this board on the internet for the world to see. Just adding more text here to see what it looks like.Deploy this board on the internet for the world to see. Just adding more text here to see what it looks like.',
    },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: "To do's for react kanban",
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
  },

  columnOrder: ['column-1'],
}

export default board
