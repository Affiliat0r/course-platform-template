import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'urgency'
  | 'warning'
  | 'premium'
  | 'new'
  | 'bestseller';

export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-secondary-100 text-secondary-800 border-secondary-200',
  primary: 'bg-primary-600 text-white shadow-sm',
  success: 'bg-green-50 text-green-800 border-green-200',
  urgency: 'bg-red-50 text-red-800 border-red-300',
  warning: 'bg-amber-50 text-amber-800 border-amber-300',
  premium: 'bg-purple-50 text-purple-800 border-purple-200',
  new: 'bg-blue-50 text-blue-800 border-blue-200',
  bestseller: 'bg-yellow-50 text-yellow-900 border-yellow-300',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-lg border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
