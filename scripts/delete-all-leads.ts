import { MongoClient, ServerApiVersion } from 'mongodb'
import { promises as fs } from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const uri = process.env.MONGODB_URI || ''
const dbName = process.env.MONGODB_DB_NAME || 'aquabion'
const DATA_DIR = path.join(process.cwd(), 'data')
const CRM_DATA_DIR = path.join(process.cwd(), 'crm_data')

async function deleteAllLeads() {
  console.log('Iniciando exclusão de leads...')

  // Limpar arquivos JSON
  console.log('Limpando arquivos JSON...')
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(path.join(DATA_DIR, 'leads.json'), '[]', 'utf8')
    console.log('Arquivo data/leads.json limpo')
  } catch (error) {
    console.error('Erro ao limpar data/leads.json:', error)
  }

  try {
    await fs.mkdir(CRM_DATA_DIR, { recursive: true })
    await fs.writeFile(path.join(CRM_DATA_DIR, 'leads.json'), '[]', 'utf8')
    console.log('Arquivo crm_data/leads.json limpo')
  } catch (error) {
    console.error('Erro ao limpar crm_data/leads.json:', error)
  }

  // Limpar coleções do MongoDB
  if (uri) {
    console.log('Conectando ao MongoDB...')
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })

    try {
      await client.connect()
      const db = client.db(dbName)

      console.log('Excluindo documentos da coleção "leads"...')
      const resultLeads = await db.collection('leads').deleteMany({})
      console.log(`Excluídos ${resultLeads.deletedCount} documentos da coleção "leads"`)

      console.log('Excluindo documentos da coleção "crm_leads"...')
      const resultCrmLeads = await db.collection('crm_leads').deleteMany({})
      console.log(`Excluídos ${resultCrmLeads.deletedCount} documentos da coleção "crm_leads"`)

    } catch (error) {
      console.error('Erro ao conectar ou excluir do MongoDB:', error)
    } finally {
      await client.close()
    }
  } else {
    console.log('MONGODB_URI não configurado, pulando exclusão no MongoDB')
  }

  console.log('Processo concluído!')
}

deleteAllLeads().catch(console.error)
