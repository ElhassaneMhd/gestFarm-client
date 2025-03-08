import { forwardRef } from 'react';
import { cn } from '@/utils/helpers';
import { tv } from 'tailwind-variants';
import { Loader } from 'lucide-react';

const button = tv({
  base: 'transition-colors flex-shrink-0 duration-300 flex font-medium',
  variants: {
    color: {
      primary: 'bg-primary text-white hover:bg-primary-hover',
      secondary: 'bg-secondary text-white hover:bg-secondary-hover',
      tertiary: 'bg-background-secondary text-text-primary hover:bg-background-tertiary',
      red: 'bg-red-600 text-white hover:bg-red-700',
      green: 'bg-green-600 text-white hover:bg-green-700',
      orange : 'bg-orange-700 text-white hover:bg-orange-800',
    },
    size: {
      small: 'px-2 py-1.5 text-xs rounded-md',
      default: 'px-3 py-2 text-sm rounded-lg',
      large: 'px-4 py-3 text-base rounded-xl',
    },
    type: {
      outline: 'bg-transparent border border-border  hover:border-transparent text-text-primary ',
      transparent: 'bg-transparent text-text-tertiary hover:text-text-secondary',
    },
    shape: {
      icon: 'h-8 w-8 items-center justify-center rounded-[4px] p-1 ',
    },
    state: {
      disabled:
        'bg-background-disabled cursor-not-allowed border-transparent hover:bg-background-disabled text-text-disabled',
      active: 'bg-primary text-white hover:bg-primary',
    },
    display: {
      'with-icon': 'gap-3 items-center',
      centered: 'justify-center',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'default',
    display: 'centered',
  },
  compoundVariants: [
    {
      color: 'primary',
      type: 'outline',
      className: 'hover:bg-primary hover:text-white',
    },
    {
      color: 'secondary',
      type: 'outline',
      className: 'hover:bg-secondary hover:text-white',
    },
    { color: 'delete', type: 'outline', className: 'hover:bg-red-700 ' },
    { shape: 'icon', size: 'small', className: 'h-6 w-6 text-xs' },
    { shape: 'icon', size: 'large', className: 'text-xl w-10 h-10' },
    { shape: 'icon', type: 'transparent', className: 'bg-transparent' },
  ],
});


export const Button = forwardRef(
  ({ children, isLoading, disabled, onClick, className, type, size, color, state, display, shape, ...props }, ref) => {
    return (
      <button
        className={cn(
          button({
            color: shape === "icon" && !color ? "tertiary" : color,
            state: disabled ? "disabled" : state,
            type,
            size,
            shape,
            display,
          }),
          className
        )}
        ref={ref}
        disabled={disabled}
        onClick={(e) => state !== "disabled" && onClick?.(e)}
        type="button"
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-3 text-white">
            <Loader className="animate-spin" />
            
            {children}
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
