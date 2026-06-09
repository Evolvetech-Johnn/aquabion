import { listLeads, createLead, updateLead } from '../src/crm/store'
import crypto from 'crypto'

async function test() {
  // 1. Create a test lead
  const testLead = {
    id: crypto.randomUUID(),
    name: 'Teste Atualização',
    email: 'teste@teste.com',
    phone: '11999999999',
    company: 'Empresa Teste',
    segment: 'industria',
    message: 'Mensagem de teste',
    city: 'São Paulo',
    state: 'SP',
    source: 'test',
    landing_page: '/test',
    utm: null,
    ip: '127.0.0.1',
    user_agent: 'Test',
    created_at: new Date().toISOString(),
    status: 'new' as const,
    assignee: undefined,
    tags: []
  }
  
  console.log('Criando lead de teste...')
  await createLead(testLead)
  console.log('Lead criado:', testLead)
  
  // 2. List leads
  console.log('\nListando leads...')
  const leads1 = await listLeads()
  console.log('Leads encontrados:', leads1.length)
  
  // 3. Update lead
  console.log('\nAtualizando status para "qualified"...')
  await updateLead(testLead.id, { status: 'qualified' })
  
  // 4. List leads again
  console.log('\nListando leads novamente...')
  const leads2 = await listLeads()
  console.log('Leads encontrados:', leads2.length)
  
  const updatedLead = leads2.find(l => l.id === testLead.id)
  console.log('Lead atualizado:', updatedLead)
}

test().catch(console.error)
