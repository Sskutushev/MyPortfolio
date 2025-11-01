// src/components/common/Button.tsx
import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "onAnimationStart"> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const variants = {
    primary: 'bg-gradient-primary text-white hover:opacity-90',
    secondary: 'bg-c-bg-tertiary border border-c-border hover:border-c-accent-blue',
    ghost: 'bg-transparent hover:bg-c-bg-tertiary'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-xl font-semibold transition-all ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};