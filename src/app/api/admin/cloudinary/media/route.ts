import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { isAdminRequest } from '@/lib/adminAuth'
import { listMedia, removeMedia } from '@/lib/cloudinaryStore'

// Configura o Cloudinary se as variáveis existirem
const isCloudinaryConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
)

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

// GET: Lista todas as mídias salvas no banco de dados local
export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const list = await listMedia()
    return NextResponse.json({
      ok: true,
      cloudinaryConfigured: isCloudinaryConfigured,
      media: list
    })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}

// DELETE: Exclui a mídia (do Cloudinary ou arquivo local simulado) e remove do banco local
export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ ok: false, error: 'ID da mídia não fornecido' }, { status: 400 })
    }

    // Busca e remove do banco local
    const removedItem = await removeMedia(id)

    if (!removedItem) {
      return NextResponse.json({ ok: false, error: 'Mídia não encontrada no banco local' }, { status: 404 })
    }

    const { public_id, url: fileUrl } = removedItem

    if (public_id.startsWith('simulated_')) {
      // Exclui o arquivo simulado localmente
      try {
        const fileName = path.basename(fileUrl)
        const filePath = path.join(process.cwd(), 'public', 'uploads', fileName)
        await fs.unlink(filePath)
      } catch (err) {
        console.warn('Erro ao deletar arquivo físico local (pode não existir mais):', err)
      }
    } else if (isCloudinaryConfigured) {
      // Exclui do Cloudinary de verdade
      await new Promise<void>((resolve, reject) => {
        cloudinary.uploader.destroy(public_id, (error) => {
          if (error) reject(error)
          else resolve()
        })
      })
    }

    return NextResponse.json({
      ok: true,
      message: 'Mídia removida com sucesso!'
    })
  } catch (e) {
    console.error('Erro ao deletar mídia:', e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
