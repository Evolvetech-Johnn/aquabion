import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'
import { v2 as cloudinary } from 'cloudinary'
import { isAdminRequest } from '@/lib/adminAuth'
import { addMedia } from '@/lib/cloudinaryStore'

// Função auxiliar para obter e limpar variáveis de ambiente
const getEnv = (key: string): string => (process.env[key] || '').trim()

function configureCloudinary() {
  const cloudName = getEnv('CLOUDINARY_CLOUD_NAME')
  const apiKey = getEnv('CLOUDINARY_API_KEY')
  const apiSecret = getEnv('CLOUDINARY_API_SECRET')
  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    })
    return true
  }
  return false
}

export async function POST(request: NextRequest) {
  // Proteção de acesso: verifica se é administrador
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ ok: false, error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileExtension = path.extname(file.name).toLowerCase()
    const originalName = file.name
    const format = fileExtension.replace('.', '')

    interface CloudinaryUploadResult {
      public_id: string
      secure_url: string
      bytes: number
      format?: string
    }

    const isCloudinaryConfigured = configureCloudinary()

    if (isCloudinaryConfigured) {
      // --- UPLOAD REAL NO CLOUDINARY ---
      // Sanitizar nome do arquivo original e adicionar sufixo único
      const cleanFileName = path.parse(originalName).name.replace(/[^a-zA-Z0-9-_]/g, '_')
      const uniquePublicId = `${cleanFileName}_${crypto.randomBytes(4).toString('hex')}`

      const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'aquabion',
            resource_type: 'auto',
            public_id: uniquePublicId,
            overwrite: false,
          },
          (error, result) => {
            if (error) reject(error)
            else if (!result) reject(new Error('Nenhum resultado recebido do Cloudinary'))
            else resolve(result as unknown as CloudinaryUploadResult)
          }
        )
        stream.end(buffer)
      })

      // Adiciona o metadado no banco local
      const mediaItem = await addMedia({
        public_id: uploadResult.public_id,
        name: originalName,
        url: uploadResult.secure_url,
        bytes: uploadResult.bytes,
        format: uploadResult.format || format,
      })

      return NextResponse.json({
        ok: true,
        simulated: false,
        media: mediaItem,
        message: 'Upload concluído com sucesso no Cloudinary!'
      })
    } else {
      // --- SIMULAÇÃO DE UPLOAD LOCAL ---
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadsDir, { recursive: true })

      // Gera um nome único para o arquivo local
      const uniqueName = `${crypto.randomUUID()}${fileExtension}`
      const filePath = path.join(uploadsDir, uniqueName)
      await fs.writeFile(filePath, buffer)

      const localUrl = `/uploads/${uniqueName}`
      const mockPublicId = `simulated_${crypto.randomBytes(8).toString('hex')}`

      // Adiciona o metadado no banco local
      const mediaItem = await addMedia({
        public_id: mockPublicId,
        name: originalName,
        url: localUrl,
        bytes: file.size,
        format: format,
      })

      return NextResponse.json({
        ok: true,
        simulated: true,
        media: mediaItem,
        message: 'Modo de simulação ativo! Arquivo armazenado localmente em /public/uploads. Configure o Cloudinary no arquivo .env.local para produção.'
      })
    }
  } catch (e) {
    console.error('Erro no upload de mídia:', e)
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
