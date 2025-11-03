// src/components/common/Card.tsx
import { motion } from 'framer-motion';
import { ReactNode, memo } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card = memo(({ children, className = '', hoverable = true }: CardProps) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -5 } : {}}
      className={`p-6 rounded-2xl bg-c-bg-secondary border border-c-border ${
        hoverable ? 'hover:border-c-accent-blue hover:shadow-2xl hover:shadow-c-accent-blue/10' : ''
      } transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';