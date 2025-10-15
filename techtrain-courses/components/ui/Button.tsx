import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
      'disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
        'bg-secondary-200 text-secondary-900 hover:bg-secondary-300': variant === 'secondary',
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50': variant === 'outline',
      },
      {
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
      },
      className
    );

    if (asChild && typeof children === 'object' && children !== null && 'props' in children) {
      const child = children as React.ReactElement;
      return <child.type {...child.props} className={cn(classes, child.props.className)} />;
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
