
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/logoaquabion.png"
                  alt="Aquabion Brasil"
                  fill
                  className="object-contain brightness-150"
                />
              </div>
              <span className="text-xl font-bold text-white">Aquabion</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Tecnologia alemã de tratamento de água sustentável, presente em mais de 50 países.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {['Início', 'Tecnologia', 'Benefícios', 'Contato'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Início' ? '/' : `/${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/politica-privacidade" className="hover:text-cyan-400 transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/termos-de-uso" className="hover:text-cyan-400 transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contato</h4>
            <p className="text-sm mb-2">contato@aquabion.com.br</p>
            <p className="text-sm mb-2">(43) 99917-1010</p>
            <div className="text-sm space-y-1 mt-4">
              <p>Londrina, PR - Brasil</p>
              <p>Balneário Camboriú, SC - Brasil</p>
              <p>São Paulo - Capital, SP - Brasil</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2025 Aquabion Brasil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
