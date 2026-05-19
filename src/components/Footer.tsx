import Link from 'next/link';
import { MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A2342] border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Aquabion Brasil
            </div>
            <p className="text-slate-400 mb-6">
              A nova engenharia da água. Tecnologia alemã patenteada para eliminação de incrustações.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Produto</h4>
            <ul className="space-y-3">
              <li><Link href="#como-funciona" className="text-slate-400 hover:text-white transition-colors">Tecnologia</Link></li>
              <li><Link href="#beneficios" className="text-slate-400 hover:text-white transition-colors">Benefícios</Link></li>
              <li><Link href="#aplicacoes" className="text-slate-400 hover:text-white transition-colors">Aplicações</Link></li>
              <li><Link href="#cases" className="text-slate-400 hover:text-white transition-colors">Casos de Sucesso</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Certificações</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Imprensa</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-400">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4" />
                <span>contato@aquabionbrasil.com.br</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 Aquabion Brasil. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-slate-500 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
