import { type ComponentProps, forwardRef } from 'react'
import { type ButtonSize, type ButtonVariant, buttonClass } from './buttonStyles'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={buttonClass(variant, size, className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'

interface ButtonLinkProps extends ComponentProps<'a'> {
  variant?: ButtonVariant
  size?: ButtonSize
  external?: boolean
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, external, ...props }, ref) => (
    <a
      ref={ref}
      className={buttonClass(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  )
)
ButtonLink.displayName = 'ButtonLink'
