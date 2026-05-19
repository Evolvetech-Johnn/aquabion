import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade | Aquabion Brasil',
  description: 'Política de privacidade e conformidade com a LGPD - Lei Geral de Proteção de Dados',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-12 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Política de Privacidade</h1>
          <p className="text-slate-600 text-lg">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <div className="space-y-8">
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-slate-950">1. Introdução</h2>
            <p className="leading-relaxed text-slate-600">
              A Aquabion Brasil (&quot;Nós&quot;, &quot;Nosso&quot;) está comprometida com a proteção da privacidade e dos dados pessoais dos nossos usuários, clientes e visitantes do site.
              Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações pessoais de acordo com a LGPD e outras normas aplicáveis.
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-slate-950">2. Dados que coletamos</h2>
            <p className="mb-4 text-slate-600">Podemos coletar os seguintes tipos de dados pessoais:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
              <li><strong className="text-slate-950">Dados de identificação:</strong> nome, e-mail, telefone, empresa.</li>
              <li><strong className="text-slate-950">Dados técnicos:</strong> IP, navegador, dispositivo e páginas visitadas.</li>
              <li><strong className="text-slate-950">Dados de contato:</strong> informações fornecidas em formulários e solicitações.</li>
              <li><strong className="text-slate-950">Dados de comunicação:</strong> registros de e-mails, mensagens e atendimentos.</li>
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-slate-950">3. Como usamos seus dados</h2>
            <p className="mb-4 text-slate-600">Utilizamos seus dados pessoais para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
              <li>Atender solicitações de contato e diagnóstico técnico;</li>
              <li>Enviar informações relevantes sobre nossos produtos e serviços;</li>
              <li>Melhorar nossos serviços e a experiência do usuário;</li>
              <li>Cumprir obrigações legais e regulatórias;</li>
              <li>Proteger nossos direitos e interesses legítimos.</li>
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-slate-950">4. Base legal para processamento</h2>
            <p className="leading-relaxed text-slate-600">
              Processamos seus dados com base nas bases legais previstas na LGPD, incluindo execução de contrato, interesses legítimos, consentimento e cumprimento de obrigação legal.
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-slate-950">5. Compartilhamento de dados</h2>
            <p className="mb-4 text-slate-600">Podemos compartilhar seus dados com:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
              <li>Fornecedores essenciais para a operação do site;</li>
              <li>Autoridades públicas, quando exigido por lei;</li>
              <li>Parceiros estratégicos, com seu consentimento.</li>
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-slate-950">6. Seus direitos (LGPD)</h2>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-600">
              <li><strong className="text-slate-950">Acessar</strong> seus dados pessoais;</li>
              <li><strong className="text-slate-950">Retificar</strong> dados incompletos ou desatualizados;</li>
              <li><strong className="text-slate-950">Anonimizar, bloquear ou eliminar</strong> dados desnecessários;</li>
              <li><strong className="text-slate-950">Revogar consentimento</strong> a qualquer momento;</li>
              <li><strong className="text-slate-950">Solicitar portabilidade</strong> dos dados;</li>
              <li><strong className="text-slate-950">Opor-se</strong> ao processamento;</li>
              <li><strong className="text-slate-950">Reclamar</strong> à ANPD.</li>
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-slate-950">7. Segurança dos dados</h2>
            <p className="leading-relaxed text-slate-600">
              Adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados, perda, alteração ou qualquer tratamento inadequado.
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-slate-950">8. Cookies e tecnologias similares</h2>
            <p className="leading-relaxed text-slate-600">
              Utilizamos cookies para melhorar sua navegação. Você pode gerenciar preferências por meio do navegador ou da ferramenta de cookies do site.
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-slate-950">9. Contato</h2>
            <p className="leading-relaxed text-slate-600 mb-4">
              Para exercer direitos ou obter mais informações, entre em contato com nosso responsável pela proteção de dados:
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-950 mb-2">Encarregado de Proteção de Dados (DPO)</p>
              <p className="text-slate-600">E-mail: privacidade@aquabionbrasil.com.br</p>
              <p className="text-slate-600">Telefone: (11) 99999-9999</p>
              <p className="text-slate-600">Endereço: São Paulo, SP - Brasil</p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-slate-950">10. Alterações nesta política</h2>
            <p className="leading-relaxed text-slate-600">
              Podemos atualizar esta Política de Privacidade periodicamente. Em caso de mudanças significativas, publicaremos a versão revisada com data atualizada.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
