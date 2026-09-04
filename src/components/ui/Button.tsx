import React from 'react';
import { cn } from '../../utils/format';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANTS: Record<Variant, string> = {
  primary:
  'bg-brand-600 text-white hover:bg-brand-700 disabled:bg-brand-300 shadow-sm',
  secondary:
  'border border-line-strong bg-surface text-ink-700 hover:border-ink-400 hover:text-ink-900 disabled:text-ink-400',
  ghost: 'text-ink-500 hover:bg-canvas hover:text-ink-900'
};

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px] rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-lg gap-2'
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors duration-150 ease-out disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}>
      
      {children}
    </button>);

}