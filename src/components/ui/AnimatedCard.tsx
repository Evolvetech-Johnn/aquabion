
'use client';

import { motion, TargetAndTransition } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  whileHover?: TargetAndTransition;
}

export default function AnimatedCard({
  children,
  className = '',
  whileHover = { y: -8 }
}: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={whileHover}
      className={`premium-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
