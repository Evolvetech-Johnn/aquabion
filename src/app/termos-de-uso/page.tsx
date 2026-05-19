import Link from 'next/link';

export const metadata = {
  title: 'Termos de Uso | Aquabion Brasil',
  description: 'Termos e condições de uso do site e serviços da Aquabion Brasil',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#071B34] text-white py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Termos de Uso
          </h1>
          <p className="text-slate-400 text-lg">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Aceitação dos Termos</h2>
            <p className="leading-relaxed">
              Ao acessar e utilizar o site da Aquabion Brasil (&quot;Site&quot;), você aceita e concorda em estar vinculado a estes Termos de Uso e a todas as leis e regulamentações aplicáveis. Se você não concordar com estes termos, por favor, não utilize o nosso Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Uso do Site</h2>
            <p className="mb-4">Você concorda em utilizar o Site apenas para fins lícitos e de acordo com estes Termos. É proibido:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Utilizar o Site para qualquer finalidade ilegal ou não autorizada;</li>
              <li>Interferir ou interromper o funcionamento do Site;</li>
              <li>Tentar obter acesso não autorizado a sistemas, dados ou informações;</li>
              <li>Transmitir malware, vírus ou quaisquer outros códigos danosos;</li>
              <li>Reproduzir, duplicar, copiar, vender ou explorar qualquer parte do Site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Propriedade Intelectual</h2>
            <p className="leading-relaxed">
              Todo o conteúdo disponível no Site, incluindo textos, gráficos, logotipos, ícones, imagens, vídeos, software e códigos, é propriedade exclusiva da Aquabion Brasil ou de seus licenciadores e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Limitação de Responsabilidade</h2>
            <p className="leading-relaxed">
              O Site e seu conteúdo são fornecidos &quot;como estão&quot; e &quot;conforme disponíveis&quot;. A Aquabion Brasil não garante que o Site estará disponível de forma ininterrupta ou livre de erros. Em nenhuma hipótese a Aquabion Brasil será responsável por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do uso ou da impossibilidade de uso do Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Links para Sites de Terceiros</h2>
            <p className="leading-relaxed">
              O Site pode conter links para sites de terceiros que não são controlados ou operados pela Aquabion Brasil. Não temos responsabilidade sobre o conteúdo, políticas de privacidade ou práticas de quaisquer sites de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Modificações</h2>
            <p className="leading-relaxed">
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento, a nosso exclusivo critério. As alterações entrarão em vigor imediatamente após sua publicação no Site. O uso continuado do Site após tais modificações constitui sua aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Lei Aplicável e Foro Competente</h2>
            <p className="leading-relaxed">
              Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa relacionada a estes termos será resolvida exclusivamente nos foros da Cidade de São Paulo, Estado de São Paulo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Disposições Gerais</h2>
            <p className="leading-relaxed">
              Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito. Nossa falha em exercitar ou fazer valer qualquer direito ou disposição destes Termos não constituirá renúncia a tal direito ou disposição.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Contato</h2>
            <p className="leading-relaxed mb-4">
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="font-semibold text-white mb-2">Aquabion Brasil</p>
              <p className="text-slate-300">E-mail: contato@aquabionbrasil.com.br</p>
              <p className="text-slate-300">Telefone: (11) 99999-9999</p>
              <p className="text-slate-300">Endereço: São Paulo, SP - Brasil</p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
