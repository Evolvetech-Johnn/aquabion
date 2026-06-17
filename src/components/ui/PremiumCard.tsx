// src/components/ui/PremiumCard.tsx

'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
}

export default function PremiumCard({ children, className = '' }: PremiumCardProps) {
  return (
    <motion.div
      className={`bg-white/30 backdrop-blur-xl border border-white/30 rounded-[24px] shadow-[0_20px_50px_rgba(10,79,175,0.06)] hover:translate-y-[-4px] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] text-slate-900 ${className}`}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  );
}
