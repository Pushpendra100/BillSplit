import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ActionButtonProps = ComponentProps<'button'>
export const ActionButton = ({ children, className, ...props }: ActionButtonProps) => {
  return (
    <button
      className={twMerge(
        'px-6 py-4 border border-black bg-highlighter hover:bg-[#841be7d5] transition-colors duration-100 ',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}