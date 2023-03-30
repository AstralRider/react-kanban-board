import React from 'react'
import classNames from 'classnames'
import { buttonTypes } from '../types/types'

const Button = ({ subtle, filled, children, gradient, shadow, ...rest }: buttonTypes) => {
  const buttonClass = classNames(
    rest.className,
    'flex items-center gap-2 rounded-md px-3.5 py-2.5',
    {
      'bg-slate-50': subtle,
      'text-white': filled,
      'bg-gradient-to-r bg-clip-text text-transparent': gradient,
      'shadow-md': shadow,
    },
  )

  return <Button className={buttonClass}>{children}</Button>
}

export default Button
