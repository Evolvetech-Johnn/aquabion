import clientPromise from '../src/lib/mongodb';

async function testMongoDBConnection() {
  console.log('🔍 Testando conexão com MongoDB Atlas...');

  try {
    const client = await clientPromise;
    console.log('✅ Conexão com MongoDB Atlas estabelecida com sucesso!');

    const db = client.db(process.env.MONGODB_DB_NAME || 'aquabion');
    console.log(`✅ Banco de dados "${db.databaseName}" acessível!`);

    // List collections
    const collections = await db.listCollections().toArray();
    console.log('📚 Coleções existentes:', collections.map(c => c.name));

    console.log('🎉 Teste de conexão concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB Atlas:', error);
    process.exit(1);
  }
}

testMongoDBConnection();
