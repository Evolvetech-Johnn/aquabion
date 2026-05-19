import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade | Aquabion Brasil',
  description: 'Política de privacidade e conformidade com a LGPD - Lei Geral de Proteção de Dados',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#071B34] text-white py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6">
            ← Voltar para a página inicial
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Política de Privacidade
          </h1>
          <p className="text-slate-400 text-lg">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Introdução</h2>
            <p className="leading-relaxed">
              A Aquabion Brasil (&quot;Nós&quot;, &quot;Nosso&quot;) está comprometida com a proteção da privacidade e dos dados pessoais dos nossos usuários, clientes e visitantes do site. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e outras normas aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Dados que Coletamos</h2>
            <p className="mb-4">Podemos coletar os seguintes tipos de dados pessoais:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white">Dados de identificação:</strong> Nome completo, e-mail, telefone, empresa;</li>
              <li><strong className="text-white">Dados técnicos:</strong> Endereço IP, tipo de navegador, dispositivo, páginas visitadas;</li>
              <li><strong className="text-white">Dados de contato:</strong> Informações fornecidas através de formulários de contato e solicitações de diagnóstico;</li>
              <li><strong className="text-white">Dados de comunicação:</strong> Registros de e-mails, mensagens e atendimentos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Como Usamos Seus Dados</h2>
            <p className="mb-4">Utilizamos seus dados pessoais para os seguintes propósitos:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Atender suas solicitações de contato e diagnóstico técnico;</li>
              <li>Enviar informações relevantes sobre nossos produtos e serviços;</li>
              <li>Melhorar nossos serviços e a experiência do usuário;</li>
              <li>Cumprir obrigações legais e regulatórias;</li>
              <li>Proteger nossos direitos e interesses legítimos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Base Legal para Processamento</h2>
            <p className="leading-relaxed">
              Processamos seus dados pessoais com base nas bases legais previstas na LGPD, incluindo:
              <strong className="text-white"> execução de contrato</strong>, <strong className="text-white">interesses legítimos</strong>, <strong className="text-white">consentimento</strong> e <strong className="text-white">cumprimento de obrigação legal</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Compartilhamento de Dados</h2>
            <p className="mb-4">Podemos compartilhar seus dados com:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fornecedores de serviços essenciais para a operação do site;</li>
              <li>Autoridades públicas, quando exigido por lei;</li>
              <li>Parceiros estratégicos, com seu consentimento prévio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Seus Direitos (LGPD)</h2>
            <p className="mb-4">Como titular de dados, você tem o direito de:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white">Acessar</strong> seus dados pessoais;</li>
              <li><strong className="text-white">Retificar</strong> dados incompletos ou desatualizados;</li>
              <li><strong className="text-white">Anonimizar, bloquear ou eliminar</strong> dados desnecessários;</li>
              <li><strong className="text-white">Revogar o consentimento</strong> a qualquer momento;</li>
              <li><strong className="text-white">Solicitar a portabilidade</strong> dos dados;</li>
              <li><strong className="text-white">Opor-se</strong> ao processamento;</li>
              <li><strong className="text-white">Reclamar</strong> à ANPD (Autoridade Nacional de Proteção de Dados).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Segurança dos Dados</h2>
            <p className="leading-relaxed">
              Adotamos medidas técnicas, administrativas e organizacionais adequadas para proteger seus dados pessoais contra acessos não autorizados, destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Cookies e Tecnologias Similares</h2>
            <p className="leading-relaxed">
              Nosso site utiliza cookies para melhorar sua experiência de navegação. Você pode gerenciar as preferências de cookies através das configurações do seu navegador ou da nossa ferramenta de gestão de cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Contato</h2>
            <p className="leading-relaxed mb-4">
              Para exercer seus direitos, solicitar mais informações ou fazer qualquer comunicação relacionada a esta Política de Privacidade, entre em contato com nosso Encarregado de Proteção de Dados (DPO):
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="font-semibold text-white mb-2">Encarregado de Proteção de Dados (DPO)</p>
              <p className="text-slate-300">E-mail: privacidade@aquabionbrasil.com.br</p>
              <p className="text-slate-300">Telefone: (11) 99999-9999</p>
              <p className="text-slate-300">Endereço: São Paulo, SP - Brasil</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Alterações nesta Política</h2>
            <p className="leading-relaxed">
              Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos alterações significativas, publicaremos a versão atualizada no nosso site com a data de revisão atualizada.
            </p>
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
