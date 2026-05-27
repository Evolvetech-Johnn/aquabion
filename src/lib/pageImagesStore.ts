import { promises as fs } from 'fs'
import path from 'path'

export type PageImageSlot = {
  id: string
  page: string
  title: string
  description: string
  defaultImage: string // fallback image or layout indicator
}

export const STRATEGIC_SLOTS: PageImageSlot[] = [
  {
    id: 'tech_step_1',
    page: 'Tecnologia',
    title: 'Passo 1: Célula Galvânica',
    description: 'Imagem ilustrando o processo de ionização galvânica e tratamento de incrustação.',
    defaultImage: '/logoaquabion.png'
  },
  {
    id: 'tech_step_2',
    page: 'Tecnologia',
    title: 'Passo 2: Aragonita Suspendida',
    description: 'Imagem mostrando a transformação do cálcio em cristais aragonita não-aderentes.',
    defaultImage: '/logoaquabion.png'
  },
  {
    id: 'tech_step_3',
    page: 'Tecnologia',
    title: 'Passo 3: Tubulação Protegida',
    description: 'Demonstração de tubulação limpa e livre de incrustações após 12 meses.',
    defaultImage: '/logoaquabion.png'
  },
  {
    id: 'about_showcase',
    page: 'Sobre Nós',
    title: 'Presença Industrial e Fábrica',
    description: 'Painel visual da engenharia alemã ou grandes instalações operando em indústrias.',
    defaultImage: '/logoaquabion.png'
  },
  {
    id: 'benefits_showcase',
    page: 'Benefícios',
    title: 'Eficiência e ROI Comercial',
    description: 'Imagem ilustrando o retorno sobre investimento e economia energética comercial.',
    defaultImage: '/logoaquabion.png'
  },
  {
    id: 'home_challenge',
    page: 'Página Inicial',
    title: 'O Desafio da Água Industrial',
    description: 'Banner exibindo incrustações severas em trocadores de calor vs. tubulação limpa.',
    defaultImage: '/logoaquabion.png'
  }
]

const DATA_DIR = path.join(process.cwd(), 'src', 'crm_data')
const FILE_PATH = path.join(DATA_DIR, 'page_images.json')

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.access(FILE_PATH)
  } catch {
    // Inicializa todos os slots vazios (usarão o default/placeholder)
    const initial: Record<string, string> = {}
    STRATEGIC_SLOTS.forEach(slot => {
      initial[slot.id] = ''
    })
    await fs.writeFile(FILE_PATH, JSON.stringify(initial, null, 2), 'utf8')
  }
}

export async function getPageImages(): Promise<Record<string, string>> {
  await ensureFile()
  const raw = await fs.readFile(FILE_PATH, 'utf8')
  return raw ? JSON.parse(raw) : {}
}

export async function bindPageImage(slotId: string, url: string): Promise<void> {
  const images = await getPageImages()
  images[slotId] = url
  await fs.writeFile(FILE_PATH, JSON.stringify(images, null, 2), 'utf8')
}

export async function unbindPageImage(slotId: string): Promise<void> {
  const images = await getPageImages()
  images[slotId] = ''
  await fs.writeFile(FILE_PATH, JSON.stringify(images, null, 2), 'utf8')
}
