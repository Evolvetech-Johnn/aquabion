
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#071B34] border-t border-white/10 text-[#86868B] py-24">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="relative w-12 h-12">
                <Image
                  src="/logoaquabion.png"
                  alt="Aquabion Brasil"
                  fill
                  className="object-contain brightness-125"
                />
              </div>
              <span className="text-2xl font-bold text-[#F5F5F7]">Aquabion</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Tecnologia alemã de tratamento de água sustentável, presente em mais de 50 países.
            </p>
          </div>

          <div>
            <h4 className="text-[#F5F5F7] font-semibold mb-8 text-lg">Links Rápidos</h4>
            <ul className="space-y-4">
              {['Início', 'Tecnologia', 'Benefícios', 'Contato'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Início' ? '/' : `/${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors duration-300 text-base">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#F5F5F7] font-semibold mb-8 text-lg">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/politica-privacidade" className="hover:text-cyan-400 transition-colors duration-300 text-base">Política de Privacidade</Link></li>
              <li><Link href="/termos-de-uso" className="hover:text-cyan-400 transition-colors duration-300 text-base">Termos de Uso</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F5F5F7] font-semibold mb-8 text-lg">Contato</h4>
            <p className="text-base mb-3">contato@aquabion.com.br</p>
            <p className="text-base mb-3">(43) 99917-1010</p>
            <div className="text-sm space-y-2 mt-6">
              <p>Londrina, PR - Brasil</p>
              <p>Balneário Camboriú, SC - Brasil</p>
              <p>São Paulo - Capital, SP - Brasil</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">
            © 2025 Aquabion Brasil. Todos os direitos reservados.
          </p>
          <p className="text-sm">
            Desenvolvido por <a href="https://evolvetechsolutions.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-300">evolvetechsolutions.com.br</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
