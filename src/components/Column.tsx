import { columnType, cardType } from '../dataModel'
import Task from './Task'
type cardArray = cardType[]

const Column = ({ column, cards }: { column: columnType; cards: cardArray }) => {
  cards.map((task: cardType) => {
    console.log(task.id)
  })

  return (
    <div className='h-full w-64 rounded-md bg-gray-100 shadow-md'>
      <div className='pt-3 text-center'>{column.title}</div>
      <div>
        {cards.map((tasks: cardType) => (
          <Task key={tasks.id}>{tasks.content}</Task>
        ))}
      </div>
    </div>
  )
}

export default Column
