import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/adminAuth';
import { getMediaList, removeMedia } from '@/services/media.service';
import { cloudinaryConfig } from '@/lib/cloudinary/cloudinary';

// GET: List all media
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const list = await getMediaList();
    const isCloudinaryConfigured = cloudinaryConfig.cloudName && cloudinaryConfig.apiKey && cloudinaryConfig.apiSecret;
    return NextResponse.json({
      ok: true,
      cloudinaryConfigured: isCloudinaryConfigured,
      media: list,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

// DELETE: Delete media
export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ ok: false, error: 'ID da mídia não fornecido' }, { status: 400 });
    }

    const removedItem = await removeMedia(id);

    if (!removedItem) {
      return NextResponse.json({ ok: false, error: 'Mídia não encontrada' }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      message: 'Mídia removida com sucesso!',
    });
  } catch (e) {
    console.error('Erro ao deletar mídia:', e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

