<<<<<<< HEAD
# Aquabion Brasil - Plataforma Premium

Plataforma de alta conversão para a tecnologia Aquabion Brasil, posicionada como solução de engenharia sustentável de padrão internacional.

## Stack Tecnológica

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Framer Motion** - Animações
- **GSAP** - Motion design avançado
- **Three.js + React Three Fiber** - Renderização 3D
- **Shadcn/UI** - Componentes
- **Supabase** - Backend
- **Vercel** - Deploy

## Instalação

1. Instale o Node.js (versão 18 ou superior)
2. Instale as dependências:

```bash
npm install --legacy-peer-deps
```

## Execução

Desenvolvimento:

```bash
npm run dev
```

Build para produção:

```bash
npm run build
```

Iniciar servidor de produção:

```bash
npm start
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página inicial
│   └── globals.css      # Estilos globais
├── components/
│   ├── Navbar.tsx       # Navegação
│   ├── Footer.tsx       # Rodapé
│   ├── ContactForm.tsx  # Formulário de contato
│   ├── Aquabion3D.tsx   # Componente 3D
│   └── ui/              # Componentes Shadcn/UI
└── lib/
    ├── utils.ts         # Utilitários
    └── supabase.ts      # Cliente Supabase
```

## Funcionalidades Principais

- ✅ Seção Hero cinematográfica
- ✅ Problema invisível com visualizações
- ✅ Explicação da tecnologia
- ✅ Comparativo de mercado
- ✅ Calculadora de ROI
- ✅ Casos de aplicação
- ✅ Sustentabilidade e ESG
- ✅ Prova social e autoridade
- ✅ CTA final premium
- ✅ Navbar responsiva
- ✅ Footer completo
- ✅ Formulário de contato

## Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Adicione as variáveis de ambiente no arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=seu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave
```

## Deploy no GitHub e Vercel

### 1. Criar repositório no GitHub

1. Vá para [GitHub](https://github.com) e crie um novo repositório
2. Não inicialize com README, .gitignore ou licença (já temos esses arquivos)

### 2. Conectar repositório local ao GitHub

```bash
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git branch -M main
git push -u origin main
```

### 3. Deploy na Vercel

1. Acesse [Vercel](https://vercel.com) e conecte sua conta do GitHub
2. Importe o repositório do Aquabion Brasil
3. Adicione as variáveis de ambiente (se houver):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clique em "Deploy"

O deploy será automático a cada novo push no repositório!

## SEO e Desempenho

- SEO técnico avançado
- Dados estruturados Schema.org
- Otimizado para Lighthouse > 95
- Imagens otimizadas

=======
# aquabion
>>>>>>> cf63f60427ba3a3af7c2dd9476434c6c2f28bffb
