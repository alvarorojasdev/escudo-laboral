'use client'

import { type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'whatsapp' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  className?: string
  icon?: ReactNode
  external?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-lg hover:shadow-xl',
  secondary:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  whatsapp:
    'bg-whatsapp text-white hover:bg-whatsapp-hover shadow-lg hover:shadow-xl',
  ghost: 'text-primary hover:bg-primary-lighter',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon,
  external = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {icon}
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {icon}
      {children}
    </button>
  )
}
