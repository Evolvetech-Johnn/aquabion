# Especificações de Imagens para Cards e Seções do Site

Este documento contém as dimensões recomendadas e proporções ideais para cada imagem do site Aquabion Brasil. Todas as imagens usam `object-fit: cover`, ou seja, a imagem preencherá todo o espaço mantendo a proporção (excesso é cortado automaticamente).

---

## 📐 Proporções Disponíveis
- **`video`**: 16:9 (paisagem)
- **`portrait`**: 3:4 (retrato)
- **`square`**: 1:1 (quadrado)

---

## 📋 Lista de Slots com Dimensões Recomendadas

| Slot ID | Página | Título | Proporção | Resolução Recomendada (px) | Observações |
|---------|--------|--------|-----------|-----------------------------|-------------|
| `hero-main` | Página Inicial | Imagem Hero Principal | 16:9 | 1920 × 1080 | Banner principal de alta resolução |
| `desafio-main` | Página Inicial | O Desafio da Água Industrial | 3:4 | 900 × 1200 | Imagem em formato retrato |
| `benefit-1` | Página Inicial | Card Benefício 1: Redução de custos | 16:9 | 1280 × 720 | Card de benefício 1 |
| `benefit-2` | Página Inicial | Card Benefício 2: Água preservada | 16:9 | 1280 × 720 | Card de benefício 2 |
| `benefit-3` | Página Inicial | Card Benefício 3: Operação sem energia | 16:9 | 1280 × 720 | Card de benefício 3 |
| `benefit-4` | Página Inicial | Card Benefício 4: Sustentabilidade real | 16:9 | 1280 × 720 | Card de benefício 4 |
| `benefit-5` | Página Inicial | Card Benefício 5: Proteção contínua | 16:9 | 1280 × 720 | Card de benefício 5 |
| `benefit-6` | Página Inicial | Card Benefício 6: Retorno rápido | 16:9 | 1280 × 720 | Card de benefício 6 |
| `tech_step_1` | Tecnologia | Passo 1: Ionização Galvânica | 1:1 | 800 × 800 | Imagem quadrada para o passo 1 |
| `tech_step_2` | Tecnologia | Passo 2: Aragonita Suspendida | 1:1 | 800 × 800 | Imagem quadrada para o passo 2 |
| `tech_step_3` | Tecnologia | Passo 3: Tubulação Protegida | 1:1 | 800 × 800 | Imagem quadrada para o passo 3 |
| `about_showcase` | Sobre Nós | Presença Industrial e Fábrica | 16:9 | 1280 × 720 | Painel visual da página Sobre Nós |
| `benefits_showcase` | Benefícios | Eficiência e ROI Comercial | 16:9 | 1280 × 720 | Imagem da página Benefícios |

---

## 💡 Dicas para Preparar as Imagens
1. **Foco no Centro**: Como o `object-fit: cover` corta o excesso, mantenha o conteúdo importante no centro da imagem
2. **Resolução**: Use as resoluções recomendadas para garantir clareza em telas grandes
3. **Formato**: Prefira formatos JPG ou WebP para otimizar o tamanho do arquivo
4. **Armazenamento**: Todas as imagens são hospedadas no Cloudinary (upload via painel admin em `/admin`)
