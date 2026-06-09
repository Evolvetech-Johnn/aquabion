import LandingPageContent from './LandingPageContent';

export const metadata = {
  title: 'Aquabion | Tratamento de Água para Condomínios e Hotéis | Diagnóstico Gratuito',
  description: 'Tecnologia alemã para eliminar calcário em condomínios e hotéis. Reduza custos de manutenção, aumente vida útil de equipamentos e economize energia sem produtos químicos.',
  keywords: 'tratamento de água para condomínio, tratamento de água para hotel, eliminação de calcário, proteção contra incrustação, água dura, sistema anti calcário, proteção hidráulica, tratamento sustentável da água, eficiência energética, redução de manutenção predial',
  openGraph: {
    title: 'Aquabion | Tratamento de Água para Condomínios e Hotéis',
    description: 'Tecnologia alemã que protege tubulações, boilers, aquecedores e sistemas hidráulicos sem utilizar energia elétrica, sal ou produtos químicos.',
    url: 'https://aquabion.com.br/condominios-hoteis',
    siteName: 'Aquabion Brasil',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function Page() {
  return <LandingPageContent />;
}
