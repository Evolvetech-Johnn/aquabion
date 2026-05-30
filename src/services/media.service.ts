import crypto from 'crypto';
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
  { id: 'hero-main', page: 'Página Inicial', title: 'Imagem Hero Principal', description: 'Banner principal de alta resolução exibido no topo da página de entrada.', defaultImage: '' },
  { id: 'desafio-main', page: 'Página Inicial', title: 'O Desafio da Água Industrial', description: 'Ilustração do desafio de incrustração severa ao lado do texto explicativo.', defaultImage: '' },
  { id: 'benefit-1', page: 'Página Inicial', title: 'Card Benefício 1: Redução de custos', description: 'Imagem ilustrativa no card de redução de custos operacionais.', defaultImage: '' },
  { id: 'benefit-2', page: 'Página Inicial', title: 'Card Benefício 2: Água preservada', description: 'Imagem ilustrativa no card de conservação e sustentabilidade da água.', defaultImage: '' },
  { id: 'benefit-3', page: 'Página Inicial', title: 'Card Benefício 3: Operação sem energia', description: 'Imagem ilustrativa no card de funcionamento passivo do sistema.', defaultImage: '' },
  { id: 'benefit-4', page: 'Página Inicial', title: 'Card Benefício 4: Sustentabilidade real', description: 'Imagem ilustrativa no card de impacto ambiental positivo contínuo.', defaultImage: '' },
  { id: 'benefit-5', page: 'Página Inicial', title: 'Card Benefício 5: Proteção contínua', description: 'Imagem ilustrativa no card de confiabilidade física dos encanamentos.', defaultImage: '' },
  { id: 'benefit-6', page: 'Página Inicial', title: 'Card Benefício 6: Retorno rápido', description: 'Imagem ilustrativa no card de ROI de menos de 24 meses.', defaultImage: '' },
  { id: 'tech_step_1', page: 'Tecnologia', title: 'Passo 1: Ionização Galvânica', description: 'Imagem ilustrando o processo de ionização galvânica e tratamento de incrustração.', defaultImage: '' },
  { id: 'tech_step_2', page: 'Tecnologia', title: 'Passo 2: Aragonita Suspendida', description: 'Imagem mostrando a transformação do cálcio em cristais aragonita não-aderentes.', defaultImage: '' },
  { id: 'tech_step_3', page: 'Tecnologia', title: 'Passo 3: Tubulação Protegida', description: 'Demonstração de tubulação limpa e livre de incrustações após 12 meses.', defaultImage: '' },
  { id: 'about_showcase', page: 'Sobre Nós', title: 'Presença Industrial e Fábrica', description: 'Painel visual da engenharia alemã ou grandes instalações operando em indústrias.', defaultImage: '' },
  { id: 'benefits_showcase', page: 'Benefícios', title: 'Eficiência e ROI Comercial', description: 'Imagem ilustrando o retorno sobre investimento e economia comercial no comparativo de mercado.', defaultImage: '' },
];

// Media storage functions (MongoDB)
export const getMediaList = async (): Promise<CloudinaryMedia[]> => {
  try {
    const db = await getDb();
    const collection = db.collection('cloudinary_media');
    const data = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Map MongoDB data to CloudinaryMedia interface
    return data.map(item => ({
      id: item.id,
      publicId: item.publicId,
      name: item.name,
      url: item.url,
      bytes: item.bytes,
      format: item.format,
      createdAt: item.createdAt
    }));
  } catch (e) {
    console.error('Failed to get media list from MongoDB:', e);
    return [];
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
    const collection = db.collection('cloudinary_media');
    await collection.insertOne(newItem);
    return newItem;
  } catch (e) {
    console.error('Failed to add media to MongoDB:', e);
    return newItem; // Return the item even if DB save fails (for graceful fallback)
  }
};

export const removeMedia = async (id: string): Promise<CloudinaryMedia | undefined> => {
  try {
    const db = await getDb();
    const collection = db.collection('cloudinary_media');
    
    // First find the media item
    const mediaItem = await collection.findOne({ id }) as CloudinaryMedia | null;

    if (!mediaItem) {
      return undefined;
    }

    // Delete from Cloudinary if not simulated
    if (!mediaItem.publicId.startsWith('simulated_')) {
      try {
        await deleteFromCloudinary(mediaItem.publicId);
      } catch (e) {
        console.error('Failed to delete from Cloudinary:', e);
      }
    }

    // Delete from MongoDB
    await collection.deleteOne({ id });
    return mediaItem;
  } catch (e) {
    console.error('Error in removeMedia:', e);
    return undefined;
  }
};

interface PageImagesData {
  [slotId: string]: { url: string; publicId?: string };
}

export const getPageImages = async (): Promise<PageImagesData> => {
  try {
    const db = await getDb();
    const collection = db.collection('page_images');
    const data = await collection.find({}).toArray();

    // Build the PageImagesData object
    const pageImages: PageImagesData = {};
    STRATEGIC_SLOTS.forEach(slot => {
      const found = data.find(item => item.slotId === slot.id);
      const url = found?.url || slot.defaultImage;
      pageImages[slot.id] = { url, publicId: found?.publicId };
    });

    return pageImages;
  } catch (e) {
    console.error('Error in getPageImages:', e);
    // Fallback to default
    const initialData: PageImagesData = {};
    STRATEGIC_SLOTS.forEach(slot => initialData[slot.id] = { url: slot.defaultImage });
    return initialData;
  }
};

export const bindPageImage = async (slotId: string, url: string, publicId?: string): Promise<void> => {
  try {
    const db = await getDb();
    const collection = db.collection('page_images');

    // Check if slot exists
    const existing = await collection.findOne({ slotId });

    if (existing) {
      // Update existing
      await collection.updateOne({ slotId }, { $set: { url, publicId: publicId || null } });
    } else {
      // Insert new
      await collection.insertOne({ slotId, url, publicId: publicId || null });
    }
  } catch (e) {
    console.error('Error in bindPageImage:', e);
    // Don't throw, just log (graceful failure)
  }
};

export const unbindPageImage = async (slotId: string): Promise<void> => {
  try {
    const db = await getDb();
    const collection = db.collection('page_images');

    // Get old image first
    const oldImage = await collection.findOne({ slotId });

    if (oldImage?.publicId && !oldImage.publicId.startsWith('simulated_')) {
      try {
        await deleteFromCloudinary(oldImage.publicId);
      } catch (e) {
        console.error('Failed to delete from Cloudinary:', e);
      }
    }

    // Update to empty URL
    await collection.updateOne({ slotId }, { $set: { url: '', publicId: null } });
  } catch (e) {
    console.error('Error in unbindPageImage:', e);
    // Don't throw, just log (graceful failure)
  }
};

export const getPageImageUrl = (slotId: string, pageImages: PageImagesData): string | undefined => {
  const data = pageImages[slotId];
  return data?.url ? data.url : undefined;
};
