import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { isAdminRequest } from '@/lib/adminAuth';
import { uploadToCloudinary } from '@/lib/cloudinary/upload';
import { addMedia } from '@/services/media.service';
import { cloudinaryConfig } from '@/lib/cloudinary/cloudinary';

export async function POST(request: NextRequest) {
  // Check admin access
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isCloudinaryConfigured = cloudinaryConfig.cloudName && cloudinaryConfig.apiKey && cloudinaryConfig.apiSecret;

    let uploadResult;
    let simulated = false;

    if (isCloudinaryConfigured) {
      // Upload to Cloudinary
      uploadResult = await uploadToCloudinary(buffer, {
        folder: 'aquabion',
        publicIdPrefix: file.name.replace(/[^a-zA-Z0-9-_]/g, '_'),
      });
    } else {
      // Fallback: create simulated media
      simulated = true;
      uploadResult = {
        publicId: `simulated_${crypto.randomUUID()}`,
        url: '/logoaquabion.png', // use existing logo as placeholder
        secureUrl: '/logoaquabion.png',
        bytes: file.size,
        format: file.name.split('.').pop() || 'png',
      };
    }

    // Save to our local media store
    const mediaItem = await addMedia({
      publicId: uploadResult.publicId,
      name: file.name,
      url: uploadResult.secureUrl || uploadResult.url,
      bytes: uploadResult.bytes,
      format: uploadResult.format || 'png',
    });

    return NextResponse.json({
      ok: true,
      simulated,
      media: mediaItem,
      message: simulated
        ? 'Modo de simulação ativo! Configure o Cloudinary no arquivo .env.local para produção.'
        : 'Upload concluído com sucesso no Cloudinary!',
    });
  } catch (e) {
    console.error('Erro no upload de mídia:', e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

