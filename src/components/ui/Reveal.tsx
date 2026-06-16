
'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

type UseInViewOptions = NonNullable<Parameters<typeof useInView>[1]>;

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  margin?: UseInViewOptions['margin'];
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  once = true,
  margin = '-100px',
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

