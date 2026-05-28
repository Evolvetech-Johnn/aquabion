# Guia Completo: MongoDB Atlas + Render

## Resposta à sua pergunta:
Sim! Usar **MongoDB Atlas** (banco de dados na nuvem) + **Render** (hospedagem) resolve COMPLETAMENTE o erro de "read-only file system"! Porque:
- Não usaremos mais arquivos JSON locais para armazenar dados
- Tudo será armazenado no MongoDB Atlas, que é um banco de dados na nuvem
- Render é uma plataforma de hospedagem que funciona perfeitamente com Next.js e MongoDB Atlas

---

## Passo 1: Configurar o MongoDB Atlas

### 1.1 Criar uma conta no MongoDB Atlas
1. Acesse [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita (ou faça login se já tiver)

### 1.2 Criar um Cluster
1. No painel, clique em **"Build a Database"**
2. Escolha a opção **"M0"** (gratuita)
3. Dê um nome ao seu cluster (ex: `aquabion-cluster`)
4. Escolha uma região próxima a você (ex: `São Paulo`)
5. Clique em **"Create"**

### 1.3 Criar um Usuário do Banco de Dados
1. Na tela de **Security Quickstart**:
   - Crie um nome de usuário (ex: `aquabion-admin`)
   - Crie uma senha segura (guarde essa senha!)
   - Clique em **"Create User"**

### 1.4 Configurar Acesso à Rede
1. Ainda na **Security Quickstart**:
   - Clique em **"Add My Current IP Address"** para adicionar seu IP
   - Para produção no Render, adicione também: `0.0.0.0/0` (permite acesso de qualquer IP, necessário para o Render)
   - Clique em **"Finish and Close"**

### 1.5 Obter a String de Conexão
1. No painel principal, clique em **"Connect"** no seu cluster
2. Escolha **"Drivers"**
3. Selecione:
   - **Driver**: Node.js
   - **Version**: 4.0 or later
4. Copie a string de conexão que se parece com isso:
   ```
   mongodb+srv://<seu-usuario>:<sua-senha>@aquabion-cluster.xxxxx.mongodb.net/
   ```
5. **Importante**: Substitua `<sua-senha>` pela senha do usuário que você criou!

---

## Passo 2: Atualizar o Arquivo .env.local
Abra o arquivo `.env.local` e substitua as credenciais do MongoDB pelas suas:

```env
# Credenciais MongoDB Atlas
MONGODB_URI=mongodb+srv://seu-usuario:sua-senha@seu-cluster.xxxxx.mongodb.net/
MONGODB_DB_NAME=aquabion
```

---

## Passo 3: Testar Localmente
1. Certifique-se que a dependência `mongodb` está instalada (ela já foi instalada: `npm install mongodb`)
2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse [http://localhost:3000/admin](http://localhost:3000/admin)
4. Faça login e teste o upload de imagens! Tudo deve funcionar sem erros de "read-only file system".

---

## Passo 4: Implantar no Render

### 4.1 Preparar o Repositório
1. Certifique-se que todos os arquivos estão commitados no Git
2. Push o repositório para o GitHub

### 4.2 Criar uma Conta no Render
Acesse [render.com](https://render.com) e crie uma conta (gratuita é suficiente para começar).

### 4.3 Criar um Novo Web Service no Render
1. Clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório do GitHub
3. Configure:
   - **Name**: `aquabion-brasil` (ou nome que você preferir)
   - **Region**: `São Paulo` (ou região mais próxima)
   - **Branch**: `main` (ou sua branch principal)
   - **Runtime**: `Node.js`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Clique em **"Create Web Service"**

### 4.4 Adicionar Variáveis de Ambiente no Render
1. No painel do seu Web Service no Render, clique em **"Environment"**
2. Adicione todas as variáveis de ambiente do seu `.env.local`:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `MONGODB_URI` (sua string de conexão do MongoDB Atlas)
   - `MONGODB_DB_NAME` (ex: `aquabion`)
   - `ADMIN_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL` (se você usar)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (se você usar)

### 4.5 Implantar
O Render automaticamente iniciará a implantação. Aguarde até que o status fique **"Live"**!

---

## Pronto!
Agora seu sistema funciona completamente na nuvem:
- Imagens são hospedadas no Cloudinary
- Dados (incluindo referências às imagens) são armazenados no MongoDB Atlas
- Site é hospedado no Render
- Nenhum erro de "read-only file system" mais! 🎉
