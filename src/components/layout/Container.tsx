import { type ComponentProps } from 'react'
import { cn } from '@/utils'

interface ContainerProps extends ComponentProps<'div'> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeStyles = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

export function Container({ size = 'lg', className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-5 sm:px-8', sizeStyles[size], className)}
      {...props}
    />
  )
}
