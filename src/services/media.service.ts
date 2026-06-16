import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import { deleteFromCloudinary } from '@/lib/cloudinary/delete';
import { getDb } from '@/lib/mongodb';

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
  { id: 'carousel-1', page: 'Página Inicial', title: 'Carrossel - Imagem 1', description: 'Primeira imagem do carrossel principal da página inicial.', defaultImage: '/logoaquabion.png' },
  { id: 'carousel-2', page: 'Página Inicial', title: 'Carrossel - Imagem 2', description: 'Segunda imagem do carrossel principal da página inicial.', defaultImage: '/logoaquabion.png' },
  { id: 'carousel-3', page: 'Página Inicial', title: 'Carrossel - Imagem 3', description: 'Terceira imagem do carrossel principal da página inicial.', defaultImage: '/logoaquabion.png' },
  { id: 'carousel-4', page: 'Página Inicial', title: 'Carrossel - Imagem 4', description: 'Quarta imagem do carrossel principal da página inicial.', defaultImage: '/logoaquabion.png' },
  { id: 'carousel-5', page: 'Página Inicial', title: 'Carrossel - Imagem 5', description: 'Quinta imagem do carrossel principal da página inicial.', defaultImage: '/logoaquabion.png' },
  { id: 'carousel-6', page: 'Página Inicial', title: 'Carrossel - Imagem 6', description: 'Sexta imagem do carrossel principal da página inicial.', defaultImage: '/logoaquabion.png' },
  { id: 'hero-main', page: 'Página Inicial', title: 'Imagem Hero Principal', description: 'Banner principal de alta resolução exibido no topo da página de entrada.', defaultImage: '/logoaquabion.png' },
  { id: 'desafio-main', page: 'Página Inicial', title: 'O Desafio da Água Industrial', description: 'Ilustração do desafio de incrustração severa ao lado do texto explicativo.', defaultImage: '/logoaquabion.png' },
  { id: 'benefit-1', page: 'Página Inicial', title: 'Card Benefício 1: Redução de custos', description: 'Imagem ilustrativa no card de redução de custos operacionais.', defaultImage: '/logoaquabion.png' },
  { id: 'benefit-2', page: 'Página Inicial', title: 'Card Benefício 2: Água preservada', description: 'Imagem ilustrativa no card de conservação e sustentabilidade da água.', defaultImage: '/logoaquabion.png' },
  { id: 'benefit-3', page: 'Página Inicial', title: 'Card Benefício 3: Operação sem energia', description: 'Imagem ilustrativa no card de funcionamento passivo do sistema.', defaultImage: '/logoaquabion.png' },
  { id: 'benefit-4', page: 'Página Inicial', title: 'Card Benefício 4: Sustentabilidade real', description: 'Imagem ilustrativa no card de impacto ambiental positivo contínuo.', defaultImage: '/logoaquabion.png' },
  { id: 'benefit-5', page: 'Página Inicial', title: 'Card Benefício 5: Proteção contínua', description: 'Imagem ilustrativa no card de confiabilidade física dos encanamentos.', defaultImage: '/logoaquabion.png' },
  { id: 'benefit-6', page: 'Página Inicial', title: 'Card Benefício 6: Retorno rápido', description: 'Imagem ilustrativa no card de ROI de menos de 24 meses.', defaultImage: '/logoaquabion.png' },
  { id: 'tech_step_1', page: 'Tecnologia', title: 'Passo 1: Ionização Galvânica', description: 'Imagem ilustrando o processo de ionização galvânica e tratamento de incrustração.', defaultImage: '/logoaquabion.png' },
  { id: 'tech_step_2', page: 'Tecnologia', title: 'Passo 2: Aragonita Suspendida', description: 'Imagem mostrando a transformação do cálcio em cristais aragonita não aderentes.', defaultImage: '/logoaquabion.png' },
  { id: 'tech_step_3', page: 'Tecnologia', title: 'Passo 3: Tubulação Protegida', description: 'Demonstração de tubulação limpa e livre de incrustações após 12 meses.', defaultImage: '/logoaquabion.png' },
  { id: 'about_showcase', page: 'Sobre Nós', title: 'Presença Industrial e Fábrica', description: 'Painel visual da engenharia alemã ou grandes instalações operando em indústrias.', defaultImage: '/logoaquabion.png' },
  { id: 'benefits_showcase', page: 'Benefícios', title: 'Eficiência e ROI Comercial', description: 'Imagem ilustrando o retorno sobre investimento e economia comercial no comparativo de mercado.', defaultImage: '/logoaquabion.png' },
];

// Helper functions for JSON file storage (fallback for LOCAL DEVELOPMENT ONLY)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
const DATA_DIR = path.join(process.cwd(), 'crm_data');
const PAGE_IMAGES_FILE = path.join(DATA_DIR, 'page_images.json');
const CLOUDINARY_MEDIA_FILE = path.join(DATA_DIR, 'cloudinary_media.json');

async function ensureDataDir() {
  try {
    if (!isVercel) {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }
  } catch {
    // Directory already exists
  }
}

async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  try {
    if (!isVercel) {
      await ensureDataDir();
      const raw = await fs.readFile(filePath, 'utf8');
      return JSON.parse(raw) as T;
    }
  } catch {
    // File doesn't exist or is invalid, return default
    if (!isVercel) {
      await fs.writeFile(filePath, JSON.stringify(defaultValue, null, 2));
    }
  }
  return defaultValue;
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  if (!isVercel) {
    await ensureDataDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }
}

// Media storage functions (MongoDB with JSON fallback)
export const getMediaList = async (): Promise<CloudinaryMedia[]> => {
  try {
    const db = await getDb();
    if (db) {
      const collection = db.collection('cloudinary_media');
      const data = await collection.find({}).sort({ createdAt: -1 }).toArray();

      // Map MongoDB data to CloudinaryMedia interface
      const media = data.map(item => ({
        id: item.id,
        publicId: item.publicId,
        name: item.name,
        url: item.url,
        bytes: item.bytes,
        format: item.format,
        createdAt: item.createdAt
      }));

      // Also save to JSON as backup (for local development)
      await writeJsonFile(CLOUDINARY_MEDIA_FILE, media);
      return media;
    } else {
      throw new Error('MongoDB not available');
    }
  } catch (error) {
    console.error('Failed to get media list from MongoDB, falling back to JSON:', error);
    // Fallback to JSON file
    return readJsonFile<CloudinaryMedia[]>(CLOUDINARY_MEDIA_FILE, []);
  }
};

export const addMedia = async (item: Omit<CloudinaryMedia, 'id' | 'createdAt'>): Promise<CloudinaryMedia> => {
  const newItem: CloudinaryMedia = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  try {
    const db = await getDb();
    if (db) {
      const collection = db.collection('cloudinary_media');
      await collection.insertOne(newItem);

      // Also update JSON file (backup)
      const currentMedia = await getMediaList();
      await writeJsonFile(CLOUDINARY_MEDIA_FILE, [newItem, ...currentMedia]);
      return newItem;
    } else {
      throw new Error('MongoDB not available');
    }
  } catch (error) {
    console.error('Failed to add media to MongoDB, falling back to JSON:', error);
    // Fallback to JSON
    const currentMedia = await readJsonFile<CloudinaryMedia[]>(CLOUDINARY_MEDIA_FILE, []);
    const updatedMedia = [newItem, ...currentMedia];
    await writeJsonFile(CLOUDINARY_MEDIA_FILE, updatedMedia);
    return newItem;
  }
};

export const removeMedia = async (id: string): Promise<CloudinaryMedia | undefined> => {
  try {
    const db = await getDb();
    if (db) {
      const collection = db.collection('cloudinary_media');

      // First find the media item
      const mediaItem = await collection.findOne({ id }) as CloudinaryMedia | null;

      if (mediaItem) {
        // Delete from Cloudinary if not simulated
        if (!mediaItem.publicId.startsWith('simulated_')) {
          try {
            await deleteFromCloudinary(mediaItem.publicId);
          } catch (error) {
            console.error('Failed to delete from Cloudinary:', error);
          }
        }

        // Delete from MongoDB
        await collection.deleteOne({ id });

        // Also update JSON file
        const currentMedia = await getMediaList();
        const updatedMedia = currentMedia.filter(m => m.id !== id);
        await writeJsonFile(CLOUDINARY_MEDIA_FILE, updatedMedia);
        return mediaItem;
      }
    } else {
      throw new Error('MongoDB not available');
    }

    return undefined;
  } catch (error) {
    console.error('Error in removeMedia, trying JSON:', error);
    // Try JSON fallback
    const currentMedia = await readJsonFile<CloudinaryMedia[]>(CLOUDINARY_MEDIA_FILE, []);
    const mediaItem = currentMedia.find(m => m.id === id);

    if (mediaItem) {
      // Delete from Cloudinary if not simulated
      if (!mediaItem.publicId.startsWith('simulated_')) {
        try {
          await deleteFromCloudinary(mediaItem.publicId);
        } catch (error) {
          console.error('Failed to delete from Cloudinary:', error);
        }
      }

      const updatedMedia = currentMedia.filter(m => m.id !== id);
      await writeJsonFile(CLOUDINARY_MEDIA_FILE, updatedMedia);
      return mediaItem;
    }

    return undefined;
  }
};

interface PageImagesData {
  [slotId: string]: { url: string; publicId?: string };
}

// Define type for JSON data
type PageImagesJson = Record<string, string | { url?: string; publicId?: string }>;

export const getPageImages = async (): Promise<PageImagesData> => {
  // Build‑time safe: return defaults immediately if we're in a build environment
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
  
  if (isBuildTime) {
    const pageImages: PageImagesData = {};
    STRATEGIC_SLOTS.forEach(slot => {
      pageImages[slot.id] = { url: slot.defaultImage, publicId: undefined };
    });
    return pageImages;
  }

  try {
    const db = await getDb();
    if (db) {
      const collection = db.collection('imagens_da_página');
      const data = await collection.find({}).toArray();

      // Build the PageImagesData object from MongoDB
      const pageImages: PageImagesData = {};
      STRATEGIC_SLOTS.forEach(slot => {
        const found = data.find(item => item.slotId === slot.id);
        const url = found?.url || slot.defaultImage;
        pageImages[slot.id] = { url, publicId: found?.publicId };
      });

      // Also save to JSON as backup
      await writeJsonFile(PAGE_IMAGES_FILE, pageImages);
      return pageImages;
    } else {
      throw new Error('MongoDB not available');
    }
  } catch (error) {
    console.error('Error in getPageImages, falling back to JSON:', error);
    // Fallback to JSON file
    const jsonData = await readJsonFile<PageImagesJson>(PAGE_IMAGES_FILE, {});
    const pageImages: PageImagesData = {};
    STRATEGIC_SLOTS.forEach(slot => {
      const jsonValue = jsonData[slot.id];
      if (typeof jsonValue === 'string') {
        // Old format: just string URL
        pageImages[slot.id] = { url: jsonValue, publicId: undefined };
      } else if (jsonValue && typeof jsonValue === 'object') {
        // New format: { url, publicId }
        pageImages[slot.id] = { 
          url: jsonValue.url || '', 
          publicId: jsonValue.publicId && jsonValue.publicId !== '' ? jsonValue.publicId : undefined 
        };
      } else {
        pageImages[slot.id] = { url: slot.defaultImage, publicId: undefined };
      }
    });

    return pageImages;
  }
};

export const bindPageImage = async (slotId: string, url: string, publicId?: string): Promise<void> => {
  try {
    const db = await getDb();
    if (db) {
      const collection = db.collection('imagens_da_página');

      // Check if slot exists
      const existing = await collection.findOne({ slotId });

      if (existing) {
        // Update existing
        await collection.updateOne({ slotId }, { $set: { url, publicId: publicId || null } });
      } else {
        // Insert new
        await collection.insertOne({ slotId, url, publicId: publicId || null });
      }

      // Also update JSON file (backup)
      const currentPageImages = await getPageImages();
      currentPageImages[slotId] = { url, publicId };
      await writeJsonFile(PAGE_IMAGES_FILE, currentPageImages);
    } else {
      throw new Error('MongoDB not available');
    }
  } catch (error) {
    console.error('Error in bindPageImage, falling back to JSON:', error);
    // Fallback to JSON (development)
    const currentPageImages = await getPageImages();
    currentPageImages[slotId] = { url, publicId };
    await writeJsonFile(PAGE_IMAGES_FILE, currentPageImages);
  }
};

export const unbindPageImage = async (slotId: string): Promise<void> => {
  try {
    const db = await getDb();
    if (db) {
      const collection = db.collection('imagens_da_página');

      // Get old image first
      const oldImage = await collection.findOne({ slotId });

      if (oldImage?.publicId && !oldImage.publicId.startsWith('simulated_')) {
        try {
          await deleteFromCloudinary(oldImage.publicId);
        } catch (error) {
          console.error('Failed to delete from Cloudinary:', error);
        }
      }

      // Update to empty URL
      await collection.updateOne({ slotId }, { $set: { url: '', publicId: null } });

      // Also update JSON file (backup)
      const currentPageImages = await getPageImages();
      currentPageImages[slotId] = { url: '', publicId: undefined };
      await writeJsonFile(PAGE_IMAGES_FILE, currentPageImages);
    } else {
      throw new Error('MongoDB not available');
    }
  } catch (error) {
    console.error('Error in unbindPageImage, falling back to JSON:', error);
    // Fallback to JSON (development)
    const currentPageImages = await getPageImages();
    const oldPublicId = currentPageImages[slotId]?.publicId;

    if (oldPublicId && !oldPublicId.startsWith('simulated_')) {
      try {
        await deleteFromCloudinary(oldPublicId);
      } catch (error) {
        console.error('Failed to delete from Cloudinary:', error);
      }
    }

    currentPageImages[slotId] = { url: '', publicId: undefined };
    await writeJsonFile(PAGE_IMAGES_FILE, currentPageImages);
  }
};
