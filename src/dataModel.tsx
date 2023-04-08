const Board = {
  name: "Create app to do's",
  cards: {
    'task-1': { id: 'task-1', content: 'Build this board' },
    'task-2': { id: 'task-2', content: 'Test this board' },
    'task-3': { id: 'task-1', content: 'Deploy this board on the internet' },
  },

  columns: {
    id: 'column-1',
    title: 'To do',
    cardOrder: ['task-1', 'task-2', 'task-3'],
  },

  columnOrder: ['column-1'],
}

export default Board
