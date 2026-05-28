import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary/upload';
import { deleteFromCloudinary as deleteCloudinary } from '@/lib/cloudinary/delete';
import { getCloudinaryUrl } from '@/lib/cloudinary/cloudinary';

// Types
export interface CloudinaryMedia {
  id: string;
  publicId: string;
  name: string;
  url: string;
  bytes: number;
  format: string;
  createdAt: string;
}

// Data file paths
const DATA_DIR = path.join(process.cwd(), 'crm_data');
const MEDIA_FILE = path.join(DATA_DIR, 'cloudinary_media.json');
const PAGE_IMAGES_FILE = path.join(DATA_DIR, 'page_images.json');

// Ensure data directory exists
const ensureDataDir = async (): Promise<void> => {
  await fs.mkdir(DATA_DIR, { recursive: true });
};

// Media storage functions
export const getMediaList = async (): Promise<CloudinaryMedia[]> => {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(MEDIA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    const err = e as { code?: string };
    if (err.code === 'ENOENT') {
      await fs.writeFile(MEDIA_FILE, '[]', 'utf8');
      return [];
    }
    console.error('Failed to read media file:', e);
    return [];
  }
};

export const addMedia = async (item: Omit<CloudinaryMedia, 'id' | 'createdAt'>): Promise<CloudinaryMedia> => {
  const list = await getMediaList();
  const newItem: CloudinaryMedia = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const newList = [newItem, ...list];
  await ensureDataDir();
  await fs.writeFile(MEDIA_FILE, JSON.stringify(newList, null, 2), 'utf8');
  return newItem;
};

export const removeMedia = async (id: string): Promise<CloudinaryMedia | undefined> => {
  const list = await getMediaList();
  const idx = list.findIndex((m) => m.id === id);
  if (idx === -1) return undefined;

  const [removed] = list.splice(idx, 1);
  await ensureDataDir();
  await fs.writeFile(MEDIA_FILE, JSON.stringify(list, null, 2), 'utf8');

  // Delete from Cloudinary if possible
  try {
    if (!removed.publicId.startsWith('simulated_')) {
      await deleteFromCloudinary(removed.publicId);
    }
  } catch (e) {
    console.error('Failed to delete from Cloudinary:', e);
  }

  return removed;
};

// Page images storage functions
export interface PageImageSlot {
  id: string;
  page: string;
  title: string;
  description: string;
  defaultImage: string;
  currentImage?: string;
  publicId?: string;
}

export const STRATEGIC_SLOTS: PageImageSlot[] = [
  { id: 'hero-main', page: 'Página Inicial', title: 'Imagem Hero Principal', description: 'Banner principal de alta resolução exibido no topo da página de entrada.', defaultImage: '' },
  { id: 'desafio-main', page: 'Página Inicial', title: 'O Desafio da Água Industrial', description: 'Ilustração do desafio de incrustação severa ao lado do texto explicativo.', defaultImage: '' },
  { id: 'benefit-1', page: 'Página Inicial', title: 'Card Benefício 1: Redução de custos', description: 'Imagem ilustrativa no card de redução de custos operacionais.', defaultImage: '' },
  { id: 'benefit-2', page: 'Página Inicial', title: 'Card Benefício 2: Água preservada', description: 'Imagem ilustrativa no card de conservação e sustentabilidade da água.', defaultImage: '' },
  { id: 'benefit-3', page: 'Página Inicial', title: 'Card Benefício 3: Operação sem energia', description: 'Imagem ilustrativa no card de funcionamento passivo do sistema.', defaultImage: '' },
  { id: 'benefit-4', page: 'Página Inicial', title: 'Card Benefício 4: Sustentabilidade real', description: 'Imagem ilustrativa no card de impacto ambiental positivo contínuo.', defaultImage: '' },
  { id: 'benefit-5', page: 'Página Inicial', title: 'Card Benefício 5: Proteção contínua', description: 'Imagem ilustrativa no card de confiabilidade física dos encanamentos.', defaultImage: '' },
  { id: 'benefit-6', page: 'Página Inicial', title: 'Card Benefício 6: Retorno rápido', description: 'Imagem ilustrativa no card de ROI de menos de 24 meses.', defaultImage: '' },
  { id: 'tech_step_1', page: 'Tecnologia', title: 'Passo 1: Ionização Galvânica', description: 'Imagem ilustrando o processo de ionização galvânica e tratamento de incrustação.', defaultImage: '' },
  { id: 'tech_step_2', page: 'Tecnologia', title: 'Passo 2: Aragonita Suspendida', description: 'Imagem mostrando a transformação do cálcio em cristais aragonita não-aderentes.', defaultImage: '' },
  { id: 'tech_step_3', page: 'Tecnologia', title: 'Passo 3: Tubulação Protegida', description: 'Demonstração de tubulação limpa e livre de incrustações após 12 meses.', defaultImage: '' },
  { id: 'about_showcase', page: 'Sobre Nós', title: 'Presença Industrial e Fábrica', description: 'Painel visual da engenharia alemã ou grandes instalações operando em indústrias.', defaultImage: '' },
  { id: 'benefits_showcase', page: 'Benefícios', title: 'Eficiência e ROI Comercial', description: 'Imagem ilustrando o retorno sobre investimento e economia comercial no comparativo de mercado.', defaultImage: '' },
];

interface PageImagesData {
  [slotId: string]: { url: string; publicId?: string };
}

export const getPageImages = async (): Promise<PageImagesData> => {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(PAGE_IMAGES_FILE, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (e) {
    const err = e as { code?: string };
    if (err.code === 'ENOENT') {
      const initialData: PageImagesData = {};
      STRATEGIC_SLOTS.forEach(slot => initialData[slot.id] = { url: '' });
      await fs.writeFile(PAGE_IMAGES_FILE, JSON.stringify(initialData, null, 2), 'utf8');
      return initialData;
    }
    console.error('Failed to read page images file:', e);
    return {};
  }
};

export const bindPageImage = async (slotId: string, url: string, publicId?: string): Promise<void> => {
  const images = await getPageImages();
  images[slotId] = { url, publicId };
  await ensureDataDir();
  await fs.writeFile(PAGE_IMAGES_FILE, JSON.stringify(images, null, 2), 'utf8');
};

export const unbindPageImage = async (slotId: string): Promise<void> => {
  const images = await getPageImages();
  const oldImage = images[slotId];
  images[slotId] = { url: '' };
  await ensureDataDir();
  await fs.writeFile(PAGE_IMAGES_FILE, JSON.stringify(images, null, 2), 'utf8');

  // Delete from Cloudinary if possible
  if (oldImage?.publicId && !oldImage.publicId.startsWith('simulated_')) {
    try {
      await deleteFromCloudinary(oldImage.publicId);
    } catch (e) {
      console.error('Failed to delete from Cloudinary:', e);
    }
  }
};

export const getPageImageUrl = (slotId: string, pageImages: PageImagesData): string | undefined => {
  const data = pageImages[slotId];
  return data?.url ? data.url : undefined;
};
