"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface AnimatedPageWrapperProps {
  children: React.ReactNode;
}

export default function AnimatedPageWrapper({ children }: AnimatedPageWrapperProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key="page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
