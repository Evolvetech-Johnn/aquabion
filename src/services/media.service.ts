import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import { deleteFromCloudinary } from '@/lib/cloudinary/delete';

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
  { id: 'desafio-main', page: 'Página Inicial', title: 'O Desafio da Água Industrial', description: 'Ilustração do desafio de incrustração severa ao lado do texto explicativo.', defaultImage: '' },
  { id: 'benefit-1', page: 'Página Inicial', title: 'Card Benefício 1: Redução de custos', description: 'Imagem ilustrativa no card de redução de custos operacionais.', defaultImage: '' },
  { id: 'benefit-2', page: 'Página Inicial', title: 'Card Benefício 2: Água preservada', description: 'Imagem ilustrativa no card de conservação e sustentabilidade da água.', defaultImage: '' },
  { id: 'benefit-3', page: 'Página Inicial', title: 'Card Benefício 3: Operação sem energia', description: 'Imagem ilustrativa no card de funcionamento passivo do sistema.', defaultImage: '' },
  { id: 'benefit-4', page: 'Página Inicial', title: 'Card Benefício 4: Sustentabilidade real', description: 'Imagem ilustrativa no card de impacto ambiental positivo contínuo.', defaultImage: '' },
  { id: 'benefit-5', page: 'Página Inicial', title: 'Card Benefício 5: Proteção contínua', description: 'Imagem ilustrativa no card de confiabilidade física dos encanamentos.', defaultImage: '' },
  { id: 'benefit-6', page: 'Página Inicial', title: 'Card Benefício 6: Retorno rápido', description: 'Imagem ilustrativa no card de ROI de menos de 24 meses.', defaultImage: '' },
  { id: 'tech_step_1', page: 'Tecnologia', title: 'Passo 1: Ionização Galvânica', description: 'Imagem ilustrando o processo de ionização galvânica e tratamento de incrustração.', defaultImage: '' },
  { id: 'tech_step_2', page: 'Tecnologia', title: 'Passo 2: Aragonita Suspendida', description: 'Imagem mostrando a transformação do cálcio em cristais aragonita não aderentes.', defaultImage: '' },
  { id: 'tech_step_3', page: 'Tecnologia', title: 'Passo 3: Tubulação Protegida', description: 'Demonstração de tubulação limpa e livre de incrustações após 12 meses.', defaultImage: '' },
  { id: 'about_showcase', page: 'Sobre Nós', title: 'Presença Industrial e Fábrica', description: 'Painel visual da engenharia alemã ou grandes instalações operando em indústrias.', defaultImage: '' },
  { id: 'benefits_showcase', page: 'Benefícios', title: 'Eficiência e ROI Comercial', description: 'Imagem ilustrando o retorno sobre investimento e economia comercial no comparativo de mercado.', defaultImage: '' },
];

// Helper functions for JSON file storage
// Use /tmp for Vercel deploy (read-only system), use local crm_data for development
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
const DATA_DIR = isVercel ? '/tmp/crm_data' : path.join(process.cwd(), 'crm_data');
const PAGE_IMAGES_FILE = path.join(DATA_DIR, 'page_images.json');
const CLOUDINARY_MEDIA_FILE = path.join(DATA_DIR, 'cloudinary_media.json');

// Copy local files to /tmp on Vercel (for initial data)
async function initVercelData() {
  if (!isVercel) return;
  
  try {
    const localDataDir = path.join(process.cwd(), 'crm_data');
    const localPageImages = path.join(localDataDir, 'page_images.json');
    const localCloudinaryMedia = path.join(localDataDir, 'cloudinary_media.json');

    // Ensure tmp dir exists
    await ensureDataDir();

    // Copy page_images.json if local file exists
    try {
      const content = await fs.readFile(localPageImages, 'utf8');
      await fs.writeFile(PAGE_IMAGES_FILE, content);
    } catch {
      // If local file doesn't exist, write default
      await writeJsonFile(PAGE_IMAGES_FILE, {});
    }

    // Copy cloudinary_media.json if local file exists
    try {
      const content = await fs.readFile(localCloudinaryMedia, 'utf8');
      await fs.writeFile(CLOUDINARY_MEDIA_FILE, content);
    } catch {
      // If local file doesn't exist, write default
      await writeJsonFile(CLOUDINARY_MEDIA_FILE, []);
    }
  } catch (e) {
    console.error('Failed to initialize Vercel data:', e);
  }
}

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory already exists
  }
}

async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  // Initialize data from local files on Vercel first
  await initVercelData();
  
  try {
    await ensureDataDir();
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    // File doesn't exist or is invalid, return default
    await fs.writeFile(filePath, JSON.stringify(defaultValue, null, 2));
    return defaultValue;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Media storage functions (JSON only)
export const getMediaList = async (): Promise<CloudinaryMedia[]> => {
  return readJsonFile<CloudinaryMedia[]>(CLOUDINARY_MEDIA_FILE, []);
};

export const addMedia = async (item: Omit<CloudinaryMedia, 'id' | 'createdAt'>): Promise<CloudinaryMedia> => {
  const newItem: CloudinaryMedia = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const currentMedia = await getMediaList();
  const updatedMedia = [newItem, ...currentMedia];
  await writeJsonFile(CLOUDINARY_MEDIA_FILE, updatedMedia);
  return newItem;
};

export const removeMedia = async (id: string): Promise<CloudinaryMedia | undefined> => {
  const currentMedia = await getMediaList();
  const mediaItem = currentMedia.find(m => m.id === id);

  if (mediaItem) {
    // Delete from Cloudinary if not simulated
    if (!mediaItem.publicId.startsWith('simulated_')) {
      try {
        await deleteFromCloudinary(mediaItem.publicId);
      } catch {
        console.error('Failed to delete from Cloudinary');
      }
    }

    const updatedMedia = currentMedia.filter(m => m.id !== id);
    await writeJsonFile(CLOUDINARY_MEDIA_FILE, updatedMedia);
    return mediaItem;
  }

  return undefined;
};

interface PageImagesData {
  [slotId: string]: { url: string; publicId?: string };
}

// Define type for JSON data
type PageImagesJson = Record<string, string | { url?: string; publicId?: string }>;

export const getPageImages = async (): Promise<PageImagesData> => {
  const jsonData = await readJsonFile<PageImagesJson>(PAGE_IMAGES_FILE, {});

  const pageImages: PageImagesData = {};
  STRATEGIC_SLOTS.forEach(slot => {
    const jsonValue = jsonData[slot.id];
    let url = '';
    let publicId: string | undefined = undefined;

    if (typeof jsonValue === 'string') {
      // Old format: just string URL
      url = jsonValue;
    } else if (jsonValue && typeof jsonValue === 'object') {
      // New format: { url, publicId }
      url = jsonValue.url || '';
      publicId = jsonValue.publicId;
    }

    // Fallback to default if no URL
    if (!url) {
      url = slot.defaultImage;
    }

    pageImages[slot.id] = { url, publicId };
  });

  // Save back to JSON to ensure consistency
  await writeJsonFile(PAGE_IMAGES_FILE, pageImages);
  return pageImages;
};

export const bindPageImage = async (slotId: string, url: string, publicId?: string): Promise<void> => {
  const currentPageImages = await getPageImages();
  currentPageImages[slotId] = { url, publicId };
  await writeJsonFile(PAGE_IMAGES_FILE, currentPageImages);
};

export const unbindPageImage = async (slotId: string): Promise<void> => {
  const currentPageImages = await getPageImages();
  const oldPublicId = currentPageImages[slotId]?.publicId;

  // Delete from Cloudinary if not simulated
  if (oldPublicId && !oldPublicId.startsWith('simulated_')) {
    try {
      await deleteFromCloudinary(oldPublicId);
    } catch {
      console.error('Failed to delete from Cloudinary');
    }
  }

  currentPageImages[slotId] = { url: '', publicId: undefined };
  await writeJsonFile(PAGE_IMAGES_FILE, currentPageImages);
};
