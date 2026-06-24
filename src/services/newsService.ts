import { NewsArticle, NewsResponse, NewsFilterOptions, NEWS_KEYWORDS } from '@/types/news';

// Sample data for demonstration (will be replaced with real API integration)
const SAMPLE_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'Aquabion Lança Nova Tecnologia de Prevenção de Incrustações para Aplicações Industriais',
    summary: 'Aquabion GmbH apresenta uma solução inovadora de condicionamento de água que previne efetivamente a formação de incrustações em sistemas de resfriamento industriais sem o uso de produtos químicos.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    source: 'Aquabion GmbH',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-06-20',
    category: 'Tecnologia',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Tratamento de Água Aquabion Reconhecido como uma das Principais Inovações de 2026',
    summary: 'Revista líder da indústria nomeia a Aquabion como uma das soluções de tratamento de água mais inovadoras do ano por sua abordagem ecológica.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    source: 'Revista da Indústria de Água',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-06-18',
    category: 'Imprensa',
  },
  {
    id: '3',
    title: 'Novo Estudo Confirma a Eficácia da Aquabion na Prevenção de Incrustações',
    summary: 'Estudo de pesquisa independente demonstra redução de 95% na formação de incrustações após 6 meses de instalação da Aquabion em instalações comerciais.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop',
    source: 'Revista de Tecnologia de Água',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-06-15',
    category: 'Pesquisa',
  },
  {
    id: '4',
    title: 'Aquabion Expande Operações na América Latina',
    summary: 'Aquabion anuncia novo escritório regional no Brasil para atender melhor à crescente demanda por soluções sustentáveis de tratamento de água.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    source: 'Business Wire',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-06-12',
    category: 'Negócios',
  },
  {
    id: '5',
    title: 'Como a Aquabion Revoluciona o Condicionamento de Água para Hotéis',
    summary: 'Estudo de caso mostra como grandes redes hoteleiras estão reduzindo custos de manutenção em 40% usando a tecnologia Aquabion.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
    source: 'Tecnologia Hoteleira',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-06-10',
    category: 'Estudo de Caso',
  },
  {
    id: '6',
    title: 'Tratamento de Água Ecológico: A Diferença Aquabion',
    summary: 'Explorando como a Aquabion oferece tratamento de água sem produtos químicos que é eficaz e ambientalmente responsável.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    source: 'Revista de Negócios Verdes',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-06-08',
    category: 'Sustentabilidade',
  },
  {
    id: '7',
    title: 'Instalações Industriais Economizam Milhares com a Aquabion',
    summary: 'Fábricas reportam economias significativas de energia após implementar a tecnologia de prevenção de incrustações da Aquabion.',
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1000&auto=format&fit=crop',
    source: 'Indústria Hoje',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-06-05',
    category: 'Indústria',
  },
  {
    id: '8',
    title: 'Tecnologia Aquabion Explicada: Como Funciona',
    summary: 'Uma análise profunda da ciência por trás da tecnologia inovadora de condicionamento de água da Aquabion.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    source: 'Insights Tech',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-06-03',
    category: 'Tecnologia',
  },
  {
    id: '9',
    title: 'Condomínios Adotam a Aquabion para Eficiência Hídrica',
    summary: 'Edifícios residenciais em todo o Brasil estão escolhendo a Aquabion para melhorar a qualidade da água e reduzir custos de manutenção.',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop',
    source: 'Notícias de Gestão Imobiliária',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-06-01',
    category: 'Residencial',
  },
  {
    id: '10',
    title: 'O Futuro do Tratamento de Água: Aquabion Liderando o Caminho',
    summary: 'Especialistas da indústria discutem como a Aquabion está moldando o futuro da tecnologia sustentável de tratamento de água.',
    imageUrl: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=1000&auto=format&fit=crop',
    source: 'Revista Future Tech',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-05-28',
    category: 'Futuro',
  },
  {
    id: '11',
    title: 'Aquabion na Cúpula Global da Água 2026',
    summary: 'Destaques da participação da Aquabion no principal evento internacional da indústria de água.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
    source: 'Conselho Global da Água',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-05-25',
    category: 'Eventos',
  },
  {
    id: '12',
    title: 'Análise de Economia de Custos: Aquabion vs. Métodos Tradicionais',
    summary: 'Comparação abrangente mostrando que a Aquabion oferece resultados superiores a uma fração do custo.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    source: 'Revista Financeira',
    sourceUrl: 'https://www.aquabion.de',
    publishedAt: '2026-05-22',
    category: 'Finanças',
  },
];

export class NewsService {
  private static instance: NewsService;

  public static getInstance(): NewsService {
    if (!NewsService.instance) {
      NewsService.instance = new NewsService();
    }
    return NewsService.instance;
  }

  public async fetchNews(options?: NewsFilterOptions): Promise<NewsResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const limit = options?.limit || 10;
    const page = options?.page || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const articles = SAMPLE_NEWS.slice(startIndex, endIndex);
    const hasMore = endIndex < SAMPLE_NEWS.length;

    return {
      articles,
      totalResults: SAMPLE_NEWS.length,
      hasMore,
    };
  }

  public async fetchArticleById(id: string): Promise<NewsArticle | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return SAMPLE_NEWS.find(article => article.id === id) || null;
  }

  // TODO: Implement real API integration with Google News API, Bing News API, etc.
  // private async fetchFromGoogleNews(keywords: string[]): Promise<NewsArticle[]> {
  //   // Implementation for Google News API
  // }
}

export default NewsService.getInstance();
