
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CloudinaryImage from '@/components/media/CloudinaryImage';
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent',
        scrolled
          ? 'bg-[#071B34]/90 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image
                src="/logoaquabion.png"
                alt="Aquabion Brasil"
                fill
                className="object-contain brightness-110"
                priority
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#F5F5F7]">
              Aquabion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-[#86868B] hover:text-cyan-400 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            <AnimatedButton size="sm" className="rounded-full">
              Agendar Visita
            </AnimatedButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 text-[#F5F5F7] bg-white/5 rounded-2xl border border-white/10"
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
            className="md:hidden bg-[#071B34]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="container-padding py-10 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-4 text-xl font-medium text-[#F5F5F7] border-b border-white/5"
                >
                  {item.name}
                  <ChevronRight className="w-6 h-6 text-[#86868B]" />
                </Link>
              ))}
              <div className="pt-6">
                <AnimatedButton className="w-full rounded-full" onClick={() => setIsOpen(false)}>
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
