import { createLead, listLeads, updateLead, getLead } from '../src/crm/store'
import crypto from 'crypto'

async function testFullFlow() {
  console.log('🧪 Iniciando teste completo do fluxo de leads...')
  
  // 1. Criar lead de teste
  const testLead = {
    id: crypto.randomUUID(),
    name: 'Teste Completo',
    email: 'teste@completo.com',
    phone: '(11) 98765-4321',
    company: 'Empresa Teste',
    segment: 'industria',
    message: 'Mensagem de teste completo',
    city: 'São Paulo',
    state: 'SP',
    source: 'test',
    landing_page: '/test',
    utm: null,
    ip: '127.0.0.1',
    user_agent: 'Test Agent',
    created_at: new Date().toISOString(),
    status: 'new' as const,
    assignee: undefined,
    tags: []
  }

  console.log('\n1. Criando lead de teste...')
  await createLead(testLead)
  console.log('✅ Lead criado com sucesso!')
  console.log('ID do lead:', testLead.id)

  // 2. Listar leads
  console.log('\n2. Listando leads...')
  const leads1 = await listLeads()
  console.log('✅ Leads listados com sucesso! Total:', leads1.length)

  // 3. Atualizar status do lead
  console.log('\n3. Atualizando status para "qualified"...')
  await updateLead(testLead.id, { status: 'qualified' })
  console.log('✅ Status atualizado com sucesso!')

  // 4. Verificar se o lead foi atualizado
  console.log('\n4. Obtendo lead atualizado...')
  const updatedLead = await getLead(testLead.id)
  console.log('✅ Lead obtido com sucesso!')
  console.log('Status atual:', updatedLead?.status)
  console.log('Lead completo:', updatedLead)

  // 5. Listar leads novamente
  console.log('\n5. Listando leads novamente...')
  const leads2 = await listLeads()
  console.log('✅ Leads listados com sucesso! Total:', leads2.length)

  console.log('\n🎉 Teste completo finalizado com sucesso!')
}

testFullFlow().catch(console.error)