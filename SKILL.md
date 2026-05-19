
# Skill: Arquiteto Digital Premium (SKILL.md)

## Objetivo
Esta skill descreve um workflow reutilizável para atuar como Arquiteto de Sites Premium e Engenheiro Fullstack Sênior — projetando, desenvolvendo e entregando websites e landing pages de alto padrão com foco em performance, conversão, SEO técnico, acessibilidade e experiência premium.

## Escopo
- Aplicável a projetos Next.js/React/TypeScript com TailwindCSS e foco em produção.
- Workspace-scoped (salvar em repositório do projeto).

## Projeto: Configuração inicial (segundo suas preferências)
- Prioridade principal: Conversão (CRO-first). Todas as decisões técnicas e de UX priorizarão taxa de conversão e qualidade do funil.
- Integrações obrigatórias: CRM (integração de captura/lead enrichment) e analytics (evento granular, GA4 + server-side quando aplicável).
- CMS: haverá CMS para edição de conteúdo (prever headless CMS, ex: Sanity/Contentful/Strapi/Prismic) — modelagem de conteúdo e preview necessários.
- i18n: suporte multilíngue obrigatório (Next.js i18n routing + estratégias de conteúdo traduzido e hreflang).

## Quando disparar
- Ao iniciar um novo projeto/site premium ou ao revisar uma entrega existente que precise elevar performance, SEO e conversão.

## Entradas esperadas
- Brief do produto (objetivos, público, KPIs).
- Conteúdo base (copy, imagens, assets de marca).
- Requisitos técnicos (integrações, CMS, formulários, analytics).

## Saídas esperadas
- Arquitetura de alto nível e estrutura de pastas.
- Lista de componentes e padrão de design system.
- Checklist de SEO, performance e acessibilidade.
- Artefatos: sitemap, meta tags, structured data, robots, canonical.

## Workflow passo a passo
1. Estratégia: mapear objetivos, KPIs, público e jornada de conversão com foco em pontos do funil (top, mid, bottom) e micro-conversões.
2. Arquitetura técnica: definir stack (Next.js, TypeScript, Tailwind), roteamento, SSR/SSG, e CDN.
	- Para conversão, priorizar renderização híbrida: SSG para páginas marketing, ISR/SSR para páginas com conteúdo dinâmico ou previews do CMS.
	- Implementar endpoints de captura que integrem diretamente com o CRM; garantir tracking de eventos desde o primeiro ponto de contato.
3. Estrutura de pastas: criar scaffold com pages/app, components, lib, styles.
4. Design System: tokens (tipografia, espaçamento, cores), componentes atômicos, grid.
5. SEO técnico: definir meta, Open Graph, Twitter Cards, schema.org, sitemap, robots, canonical.
6. Implementação: componentização, lazy-loading, imagens otimizadas, SSR/ISR quando aplicável.
	- Implementar formulários com progressive enhancement, validação inline, proteção anti-bot e integração server-side com CRM/ESP.
	- Rastreabilidade: instrumentar eventos cross-domain, UTM persistence e mapping para CRM/analytics.
7. Performance: otimizar Core Web Vitals (LCP, FID/INP, CLS), compressão, cache, CDN rules.
8. Acessibilidade: semântica, ARIA, navegação por teclado, contraste.
9. CRO: estrutura de copy, CTAs, prova social, microinterações e testes A/B.
10. QA e Deploy: testes, Lighthouse >90 objetivo, monitoramento pós-deploy.

## Pontos de decisão (branching)
- Se prioridade = SEO pesado → SSR/Sitemap/structured data prioritários.
- Se prioridade = velocidade pura → SSG + edge CDN + imagens AVIF/WebP.
- Se integrações dinâmicas (ex: Supabase) → usar ISR/SSR para dados críticos.

## Critérios de qualidade / Checklist de aceitação
- Lighthouse (Performance, Accessibility, Best Practices, SEO) objetivo >90.
- Tags meta completas e previews sociais implementados.
- Estrutura de headings semântica e conteúdo indexável.
- Sitemap e robots configurados.
- Componentes reutilizáveis com tipos TypeScript e testes básicos.
- Imagens responsivas com lazy-loading e otimização.
- Keyboard navigation e roles ARIA passados.

## Artefatos e templates incluídos
- Exemplo de estrutura de pastas recomendada.
- Template de meta tags e Structured Data.
- Checklist de performance e SEO para PR.

## Perguntas de clarificação (pontas ambíguas a validar)
Estas perguntas foram respondidas pelo stakeholder e aplicadas acima:
1. Prioridade: Conversão.
2. Integrações: CRM e analytics (implementação server-side recomendada para eventos críticos).
3. CMS: Sim — usar headless CMS com preview e modelagem por tipo de conteúdo.
4. i18n: Suporte multilíngue obrigatório; considerar rotas por locale e hreflang.

Se desejar, posso transformar essas escolhas em um `project-config.md` ou scaffolding inicial.

## Exemplo de prompts para usar esta skill
- "Planeje a arquitetura para uma landing page SaaS com foco em conversão e Lighthouse>90."
- "Gere a estrutura de pastas e os principais componentes para um site Next.js premium." 
- "Liste o checklist de SEO técnico e as meta tags para a home." 

## Iteração e versão
1. Rascunho inicial (este arquivo).
2. Validar respostas às perguntas de clarificação.
3. Ajustar workflow conforme integrações e prioridades do projeto.

## Recomendações de skills relacionadas
- Criar uma `skill` para revisão de PRs focada em Performance/SEO.
- Criar templates de Component Library (Design System) e checklist de QA.

---
_Gerado como base para orientação de um Arquiteto Digital Premium — personalize conforme contexto do projeto._
