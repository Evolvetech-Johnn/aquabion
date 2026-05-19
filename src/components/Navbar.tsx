'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Sobre', href: '/sobre' },
    { name: 'Tecnologia', href: '/tecnologia' },
    { name: 'Benefícios', href: '/beneficios' },
    { name: 'Aplicações', href: '/aplicacoes' },
    { name: 'Cases', href: '/cases' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#071B34]/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Aquabion
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contato">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950">
                Agendar Diagnóstico
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#0A2342] border-t border-white/10">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contato" onClick={() => setIsMenuOpen(false)}>
              <Button size="lg" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950">
                Agendar Diagnóstico
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
