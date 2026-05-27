import Link from 'next/link';
import NextImage from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-4 mb-4">
              <NextImage src="/logoaquabion.png" alt="Aquabion Brasil" width={64} height={64} className="object-contain" />
              <span className="text-2xl font-semibold tracking-tight text-slate-950">
                <span className="bg-gradient-to-r from-cyan-600 via-cyan-500 to-slate-900 bg-clip-text text-transparent">
                  Aquabion Brasil
                </span>
              </span>
            </Link>
            <p className="text-slate-600 mb-6">
              A nova engenharia da água com inovação alemã e entrega confiável.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-slate-950 mb-4">Produto</h4>
            <ul className="space-y-3">
              <li><Link href="/tecnologia" className="text-slate-600 hover:text-slate-950 transition-colors">Tecnologia</Link></li>
              <li><Link href="/beneficios" className="text-slate-600 hover:text-slate-950 transition-colors">Benefícios</Link></li>
              <li><Link href="/aplicacoes" className="text-slate-600 hover:text-slate-950 transition-colors">Aplicações</Link></li>
              <li><Link href="/cases" className="text-slate-600 hover:text-slate-950 transition-colors">Casos de Sucesso</Link></li>
              <li><Link href="/blog" className="text-slate-600 hover:text-slate-950 transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-slate-600 hover:text-slate-950 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-slate-950 mb-4">Empresa</h4>
            <ul className="space-y-3">
              <li><Link href="/sobre" className="text-slate-600 hover:text-slate-950 transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contato" className="text-slate-600 hover:text-slate-950 transition-colors">Contato</Link></li>
              <li><Link href="/admin" className="text-slate-600 hover:text-slate-950 transition-colors">Área Administrativa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-slate-950 mb-4">Contato</h4>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-600" />
                <span>contato@aquabion.com.br</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cyan-600" />
                <span>São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Aquabion Brasil. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-slate-500 text-sm">
            <Link href="/politica-privacidade" className="hover:text-slate-900 transition-colors">Política de Privacidade</Link>
            <Link href="/termos-de-uso" className="hover:text-slate-900 transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
