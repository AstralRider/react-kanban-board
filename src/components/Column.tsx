import { columnType, cardType } from '../dataModel'

type cardArrary = {
  [key: number]: cardType
}

const Column = ({ column, cards }: { column: columnType; cards: cardArrary }) => {
  return (
    <div className='h-full w-64 rounded-md bg-gray-100 shadow-md'>
      <div className='pt-3 text-center'>{column.title}</div>
      <div></div>
    </div>
  )
}

export default Column
