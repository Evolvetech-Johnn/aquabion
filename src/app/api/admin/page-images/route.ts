import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/adminAuth'
import { getPageImages, bindPageImage, unbindPageImage, STRATEGIC_SLOTS } from '@/lib/pageImagesStore'

// GET: Retorna a lista de slots estratégicos e suas imagens atuais
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const images = await getPageImages()
    const slotsWithValues = STRATEGIC_SLOTS.map(slot => ({
      ...slot,
      currentImage: images[slot.id] || ''
    }))

    return NextResponse.json({
      ok: true,
      slots: slotsWithValues
    })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}

// POST: Vincula uma imagem a um slot específico
export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const { slotId, url } = body

    if (!slotId) {
      return NextResponse.json({ ok: false, error: 'slotId não fornecido' }, { status: 400 })
    }

    if (url) {
      await bindPageImage(slotId, url)
    } else {
      await unbindPageImage(slotId)
    }

    return NextResponse.json({
      ok: true,
      message: url ? 'Imagem vinculada com sucesso!' : 'Imagem removida e restaurada ao padrão!'
    })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
