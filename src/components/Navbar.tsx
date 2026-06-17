
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedButton from './ui/AnimatedButton';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Início', href: '/' },
  { name: 'Tecnologia', href: '/tecnologia' },
  { name: 'Benefícios', href: '/beneficios' },
  { name: 'Aplicações', href: '/aplicacoes' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contato', href: '/contato' },
  { name: 'Cases de Sucesso', href: '/cases' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-slate-200 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logoaquabion.png"
                alt="Aquabion Brasil"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-950">
              Aquabion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-cyan-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <AnimatedButton size="sm">
              Agendar Visita
            </AnimatedButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-3 text-lg font-medium text-slate-900 border-b border-slate-100"
                >
                  {item.name}
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </Link>
              ))}
              <div className="pt-4">
                <AnimatedButton className="w-full" onClick={() => setIsOpen(false)}>
                  Agendar Visita
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

