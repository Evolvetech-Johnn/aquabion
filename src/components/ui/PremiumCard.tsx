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
      className={`bg-white/5 backdrop-blur-md border border-[#0A4FAF]/8 rounded-[24px] shadow-[0_20px_60px_rgba(10,79,175,0.12)] hover:translate-y-[-4px] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  );
}
