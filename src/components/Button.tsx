import React from 'react'
import { buttonTypes } from '../types/types'
import classNames from 'classnames'

const Button = ({
  subtle,
  filled,
  children,
  gradient,
  shadow,
  active,
  textCenter,
  grey,
  ...rest
}: buttonTypes) => {
  const buttonClass = classNames(
    rest.className,
    'flex items-center gap-2 rounded-md px-3.5 py-2 w-11/12 min-w-[180px]',
    {
      'bg-slate-50': subtle,
      'bg-gray-200': grey,
      'text-white': filled,
      'bg-gradient-to-r bg-clip-text text-transparent': gradient,
      'shadow-md': shadow,
      'active:translate-y-0.5': active,
      'justify-center': textCenter,
    },
  )

  return (
    <button {...rest} className={buttonClass}>
      {children}
    </button>
  )
}

export default Button
