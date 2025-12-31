import { type ComponentProps } from 'react'

interface ContainerProps extends ComponentProps<'div'> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeStyles = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-6xl',
}

export function Container({
  size = 'lg',
  className = '',
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`}
      {...props}
    />
  )
}

