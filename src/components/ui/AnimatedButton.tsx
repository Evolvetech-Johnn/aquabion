
'use client';

import { forwardRef, ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-slate-950 text-white hover:bg-slate-800 shadow-xl hover:shadow-[0_15px_35px_-10px_rgba(15,23,42,0.5]',
        outline: 'border-2 border-slate-200 bg-white text-slate-900 hover:border-cyan-300 hover:shadow-lg',
        secondary: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100',
        ghost: 'hover:bg-slate-100 text-slate-700',
      },
      size: {
        default: 'h-12 px-8 py-4 text-base',
        sm: 'h-10 px-6 py-2 text-sm',
        lg: 'h-14 px-10 py-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

type MotionButtonProps = ComponentProps<typeof motion.button>;

interface AnimatedButtonProps
  extends Omit<MotionButtonProps, 'className' | 'children'>,
    VariantProps<typeof buttonVariants> {
  showArrow?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant,
      size,
      showArrow = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            children
          )}
          {showArrow && !loading && (
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            )}
        </span>
        {variant === 'primary' && (
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600"
            initial={{ x: '-100%' }}
            whileHover={{ x: '0%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          />
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;

