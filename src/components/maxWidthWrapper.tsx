import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface maxWidthWrapperProps {
  children: ReactNode
  className?: string
}

const MaxWidthWrapper = ({ children, className }: maxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-20',
        className
      )}
    >
    {children}
    </div>
  )
}

export default MaxWidthWrapper
