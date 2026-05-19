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
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="premium-card text-center"
        >
          <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
            {stat.value}
          </div>
          <div className="text-slate-400 text-lg">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
