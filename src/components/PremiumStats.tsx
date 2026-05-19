'use client';

import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
}

interface PremiumStatsProps {
  stats: Stat[];
}

export default function PremiumStats({ stats }: PremiumStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="rounded-[2rem] border border-slate-200/70 bg-white p-8 text-center shadow-sm"
        >
          <div className="text-4xl md:text-5xl font-semibold text-slate-950 mb-2">
            {stat.value}
          </div>
          <div className="text-slate-500 text-base md:text-lg">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
