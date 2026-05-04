# Hub CCS — Setup Técnico & Infraestrutura
## Guia Completo de Setup

---

## 1. ESTRUTURA DE REPOSITÓRIOS

```
ccs-hub/
├── backend/                    # API Node.js + Express
│   ├── src/
│   │   ├── api/               # Rotas
│   │   ├── lib/               # Utilitários
│   │   │   └── deepseek.js   # Cliente IA
│   │   ├── db/                # Conexão Supabase
│   │   ├── middleware/        # Auth, CORS, etc
│   │   └── utils/             # Helpers
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/                   # Next.js + React
│   ├── app/
│   │   ├── dashboard/
│   │   ├── pedidos/
│   │   ├── templates/
│   │   ├── relatorios/
│   │   └── layout.jsx
│   ├── components/
│   │   ├── Alerts/
│   │   ├── PedidoCard/
│   │   ├── TemplateGenerator/
│   │   └── ChatwootPanel/
│   ├── lib/
│   │   ├── api.js            # Chamadas ao backend
│   │   └── supabase.js       # Cliente Supabase
│   ├── .env.local.example
│   ├── next.config.js
│   └── package.json
│
├── n8n-workflows/             # Seus fluxos (no Repocloud)
│   ├── sync-sheets.json
│   ├── rastreamento-correios.json
│   ├── alertas-diarios.json
│   └── chatwoot-listener.json
│
├── docs/
│   ├── ARQUITETURA.md
│   ├── DECISOES.md
│   ├── SCHEMA.sql
│   └── SETUP.md (este arquivo)
│
└── README.md
```

---

## 2. INFRAESTRUTURA

### Seu Setup Atual ✅
```
┌─────────────────┐
│  RepoCloud      │  n8n (existente)
└─────────────────┘

Você quer ADICIONAR:
```

### Setup Proposto

```
┌──────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend)                      │
│              Next.js CCS Hub Interface                    │
└─────────────────┬──────────────────────────────────────┘
                  │
┌─────────────────▼──────────────────────────────────────┐
│                    VERCEL (Backend)                      │
│              Node.js API + DeepSeek                     │
└─────────────────┬──────────────────────────────────────┘
                  │
          ┌───────┼────────┬───────────┐
          │       │        │           │
    ┌─────▼──┐ ┌──▼─────┐ │   ┌──────▼──────┐
    │Supabase│ │Railway │ │   │DeepSeek API │
    │(BD)    │ │n8n     │ │   │(IA)         │
    └────────┘ │Chatwoot│ │   └─────────────┘
               │Docker  │ │
               └────────┘ │
                          │
                    ┌─────▼──────┐
                    │Google Drive│
                    │ (backup)   │
                    └────────────┘
```

### Cada Serviço:

| Serviço | O quê | Por quê | Custo |
|---------|-------|---------|-------|
| **Vercel** | Frontend (Next.js) | Deploy fácil, fast, edge | FREE/PRO |
| **Vercel** | Backend (Node.js) | Deploy fácil | FREE/PRO |
| **Supabase** | PostgreSQL + Auth | DB managed, real-time | FREE (~$5/mês) |
| **Railway** | n8n + Chatwoot | Docker, escalável | ~$5-10/mês |
| **DeepSeek** | API IA | Seu crédito existente | ~$0.02/mês |

**TOTAL:** ~$10-20/mês (você já tem quase tudo)

---

## 3. PASSO A PASSO: SETUP

### 3.1 Pré-requisitos
- [ ] Conta GitHub
- [ ] Conta Vercel (gratuita em vercel.com)
- [ ] Conta Supabase (gratuita em supabase.com)
- [ ] Conta Railway (gratuita em railway.app)
- [ ] n8n já rodando no Repocloud
- [ ] API Key DeepSeek (você tem ✅)

### 3.2 Passo 1: GitHub

```bash
# Criar repositório
git clone https://github.com/seu-user/ccs-hub.git
cd ccs-hub

# Estrutura inicial
mkdir backend frontend n8n-workflows docs

# Git setup
git config user.email "seu@email.com"
git config user.name "Seu Nome"
git add .
git commit -m "Initial commit"
git push origin main
```

### 3.3 Passo 2: Supabase

**Em supabase.com:**

1. Criar projeto novo
   - Nome: `ccs-hub-prod`
   - Region: São Paulo (sp-seed)
   
2. Pegar credenciais:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. Executar schema SQL:
   ```bash
   # No terminal do Supabase (SQL Editor)
   # Copiar conteúdo de CCS_HUB_SCHEMA_BANCO.sql
   # Paste e Execute
   ```

4. Criar tabelas de usuários (seeding):
   ```sql
   -- Já vem no schema
   ```

---

### 3.4 Passo 3: Backend (Node.js)

```bash
cd backend

# Inicializar projeto
npm init -y

# Instalar dependências
npm install express cors dotenv @supabase/supabase-js openai axios pdfjs-dist

# Dev dependencies
npm install -D nodemon typescript @types/node

# Estrutura de pastas
mkdir -p src/{api,lib,db,middleware,utils}

# Criar arquivo de entrada
touch src/server.js
```

**Arquivo: `backend/.env.example`**
```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxxx

# DeepSeek
DEEPSEEK_API_KEY=sk_live_xxxxxxxxx
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1

# App
PORT=3000
NODE_ENV=development
JWT_SECRET=seu-secreto-super-seguro
```

**Arquivo: `backend/src/server.js`**
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Rotas de IA
import iaRoutes from './api/ia.js';
app.use('/api/ia', iaRoutes);

// Rotas de Pedidos
import pedidosRoutes from './api/pedidos.js';
app.use('/api/pedidos', pedidosRoutes);

// Tratamento de erro geral
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: err.message,
    timestamp: new Date()
  });
});

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando em http://localhost:${PORT}`);
});
```

**Arquivo: `backend/package.json`**
```json
{
  "name": "ccs-hub-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "@supabase/supabase-js": "^2.38.0",
    "openai": "^4.20.0",
    "axios": "^1.6.0",
    "pdfjs-dist": "^3.11.174"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

**Testar localmente:**
```bash
npm run dev
# Ir em http://localhost:3000/health
# Deve retornar: { "status": "ok", "timestamp": "..." }
```

---

### 3.5 Passo 4: Frontend (Next.js)

```bash
cd frontend

# Criar projeto Next.js
npx create-next-app@latest . --typescript --tailwind --app

# Dependências extras
npm install @supabase/supabase-js zustand axios

# Estrutura
mkdir -p app/{dashboard,pedidos,templates,relatorios}
mkdir -p components/{Alerts,PedidoCard,TemplateGenerator}
mkdir -p lib
```

**Arquivo: `frontend/.env.local.example`**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxx
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Arquivo: `frontend/app/layout.jsx`**
```javascript
import './globals.css';

export const metadata = {
  title: 'Hub CCS - Microset',
  description: 'Ferramenta unificada de operações',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
          <h1>📊 Hub CCS</h1>
          <p>Ferramenta Unificada de Operações</p>
        </header>
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
```

**Testar localmente:**
```bash
npm run dev
# Ir em http://localhost:3000
# Deve mostrar interface
```

---

### 3.6 Passo 5: Deploy (Vercel)

**Para o Backend:**
```bash
# No diretório backend/
cd backend

# Deploy para Vercel
npm i -g vercel
vercel

# Seguir instruções
# → Projeto novo
# → Link com GitHub
# → Adicionar env vars (SUPABASE_URL, DEEPSEEK_API_KEY, etc)
# → Deploy!
```

**Para o Frontend:**
```bash
# No diretório frontend/
cd frontend

vercel

# Seguir instruções
# → Linkado com GitHub
# → Adicionar env vars
# → Deploy!
```

---

### 3.7 Passo 6: Railway (n8n + Chatwoot)

**n8n (já tem no Repocloud, mas vamos deixar lá)**

**Chatwoot no Railway:**

1. Ir em railway.app
2. Criar novo projeto
3. Conectar repositório
4. Selecionar template "Docker"
5. Docker compose:

```yaml
version: '3'
services:
  chatwoot:
    image: chatwoot/chatwoot:latest
    environment:
      DEFAULT_LOCALE: pt_BR
      POSTGRES_HOST: postgres
      POSTGRES_USERNAME: chatwoot
      POSTGRES_PASSWORD: chatwoot_secret
      POSTGRES_DB: chatwoot_db
      RAILS_ENV: production
      RAILS_LOG_TO_STDOUT: 'true'
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: chatwoot
      POSTGRES_PASSWORD: chatwoot_secret
      POSTGRES_DB: chatwoot_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 4. VARIÁVEIS DE AMBIENTE

### Backend (Vercel)

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxxx
DEEPSEEK_API_KEY=sk_live_xxxxxxxxx
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
PORT=3000
NODE_ENV=production
JWT_SECRET=seu-super-secreto-aleatorio-longo
```

### Frontend (Vercel)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxx
NEXT_PUBLIC_API_URL=https://seu-backend.vercel.app
```

### n8n (Repocloud - já tem)

```
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=seu_user
N8N_BASIC_AUTH_PASSWORD=sua_senha
DB_TYPE=postgresdb
```

---

## 5. CHECKLIST DE SETUP

- [ ] Repositório GitHub criado
- [ ] Backend estruturado + testado localmente
- [ ] Frontend estruturado + testado localmente
- [ ] Supabase conta criada + schema importado
- [ ] DeepSeek API key configurada
- [ ] Railway/Chatwoot setup (opcional na v1)
- [ ] Backend deployado (Vercel)
- [ ] Frontend deployado (Vercel)
- [ ] Variáveis de ambiente configuradas
- [ ] Teste end-to-end: criar pedido → ver no hub

---

## 6. COMANDOS ÚTEIS

### Git
```bash
# Atualizar código
git pull origin main

# Novo feature
git checkout -b feature/nova-funcionalidade
git commit -am "Descrição"
git push origin feature/nova-funcionalidade
# Criar PR no GitHub

# Deploy automático
# Ao fazer merge para main, Vercel faz deploy automático
```

### Supabase CLI
```bash
# Conectar a um projeto
supabase init
supabase link

# Criar migration
supabase migration new adicionar_tabela_xyz

# Rodar migrations
supabase migration up
```

### n8n
```bash
# Seu n8n no Repocloud já está rodando
# Acessar em: https://seu-repocloud-url/n8n
# Criar fluxos de lá mesmo
```

---

## 7. MONITORAMENTO

### Vercel
- Dashboard automático em vercel.com
- Analíticos (requisições, latência)
- Logs (view em "Functions" → logs)

### Supabase
- Dashboard em supabase.com
- Monitoring → Performance
- Logs → Real-time

### DeepSeek
- Painel em api.deepseek.com
- Uso de tokens
- Histórico de requisições

---

## 8. TROUBLESHOOTING

### "Backend diz connection refused"
- [ ] Verificar SUPABASE_URL está correto
- [ ] Verificar SUPABASE_ANON_KEY é válida
- [ ] Verificar firewall permite conexão

### "Deploy no Vercel falha"
- [ ] Verificar arquivo `vercel.json` existe
- [ ] Verificar env vars configuradas
- [ ] Ver logs em vercel.com → Deployments

### "DeepSeek API retorna erro"
- [ ] Verificar API key é válida
- [ ] Verificar tem crédito (suaface em api.deepseek.com)
- [ ] Verificar rate limit (máx 10 req/min)

---

## 9. DOCUMENTAÇÃO IMPORTANTE

Guardar esses arquivos em `docs/`:

```
docs/
├── ARQUITETURA.md (visão geral)
├── DECISOES.md (suas decisões)
├── SCHEMA.sql (banco de dados)
├── SETUP.md (este arquivo)
├── API_ENDPOINTS.md (rotas)
├── N8N_WORKFLOWS.md (automações)
└── DEEPSEEK_PROMPTS.md (prompts de IA)
```

---

**Pronto para começar?** 🚀

Quer que eu:
- [ ] Crie os arquivos iniciais do backend
- [ ] Crie os arquivos iniciais do frontend
- [ ] Envie o `vercel.json` e `docker-compose.yml`
- [ ] Tudo acima

Qual você prefere começar?
