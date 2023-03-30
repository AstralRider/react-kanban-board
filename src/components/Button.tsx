import classNames from 'classnames'
import { buttonTypes } from '../types/types'

const Button = ({
  subtle,
  filled,
  children,
  gradient,
  shadow,
  active,
  textCenter,
  ...rest
}: buttonTypes) => {
  const buttonClass = classNames(
    rest.className,
    'flex items-center gap-2 rounded-md px-3.5 py-2.5',
    {
      'bg-slate-50': subtle,
      'text-white': filled,
      'bg-gradient-to-r bg-clip-text text-transparent': gradient,
      'shadow-md': shadow,
      'active:translate-y-0.5': active,
      'justify-center': textCenter,
    },
  )

  return <button className={buttonClass}>{children}</button>
}

export default Button
