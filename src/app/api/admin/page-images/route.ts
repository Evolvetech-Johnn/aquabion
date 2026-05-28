import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAdminRequest } from '@/lib/adminAuth';
import {
  getPageImages,
  bindPageImage,
  unbindPageImage,
  STRATEGIC_SLOTS,
} from '@/services/media.service';

// GET: Return list of strategic slots and their current images
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const images = await getPageImages();
    const slotsWithValues = STRATEGIC_SLOTS.map((slot) => ({
      ...slot,
      currentImage: images[slot.id]?.url || '',
      publicId: images[slot.id]?.publicId,
    }));

    return NextResponse.json({
      ok: true,
      slots: slotsWithValues,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

// POST: Bind image to specific slot
export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { slotId, url, publicId } = body;

    if (!slotId) {
      return NextResponse.json({ ok: false, error: 'slotId não fornecido' }, { status: 400 });
    }

    if (url) {
      await bindPageImage(slotId, url, publicId);
    } else {
      await unbindPageImage(slotId);
    }

    // Revalidate all public pages
    revalidatePath('/');
    revalidatePath('/tecnologia');
    revalidatePath('/sobre');
    revalidatePath('/beneficios');
    revalidatePath('/aplicacoes');
    revalidatePath('/cases');
    revalidatePath('/blog');
    revalidatePath('/faq');
    revalidatePath('/contato');

    return NextResponse.json({
      ok: true,
      message: url ? 'Imagem vinculada com sucesso!' : 'Imagem removida e restaurada ao padrão!',
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

