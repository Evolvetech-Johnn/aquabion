import { NextResponse } from 'next/server';
import { getClientPromiseSafe } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('🔍 Testando conexão com MongoDB Atlas...');
    const client = await getClientPromiseSafe();
    
    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error: 'MONGODB_URI não configurada ou não pôde conectar',
          message: 'MongoDB não está configurado corretamente no arquivo .env.local.'
        },
        { status: 500 }
      );
    }

    console.log('✅ Conexão com MongoDB Atlas estabelecida com sucesso!');
    const db = client.db(process.env.MONGODB_DB_NAME || 'aquabion');
    console.log(`✅ Banco de dados "${db.databaseName}" acessível!`);

    // List collections
    const collections = await db.listCollections().toArray();
    console.log('📚 Coleções existentes:', collections.map(c => c.name));

    return NextResponse.json({
      success: true,
      message: 'Conexão com MongoDB Atlas está funcionando!',
      database: db.databaseName,
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB Atlas:', error);
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: 'Falha ao conectar ao MongoDB Atlas. Verifique as credenciais e o IP no Atlas.'
      },
      { status: 500 }
    );
  }
}
