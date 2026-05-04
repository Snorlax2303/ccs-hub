# 🚀 Guia de Desenvolvimento - CCS Hub

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Git configurado
- Supabase account (credenciais em `.env`)
- DeepSeek API key (credenciais em `.env`)

## ⚙️ Setup Inicial

### 1. Clonar e Instalar

```bash
git clone https://github.com/Snorlax2303/ccs-hub.git
cd ccs-hub

# Instalar dependências
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
# Copiar template
cp .env.example .env

# Preencher com suas credenciais:
# - SUPABASE_URL
# - SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_KEY
# - DEEPSEEK_API_KEY
```

### 3. Importar Schema no Supabase

1. Abrir: https://app.supabase.com
2. Escolher projeto
3. SQL Editor → New Query
4. Cola o conteúdo de `schema.sql`
5. Executar (Ctrl + Enter)

## 🎮 Rodar Localmente

### Opção 1: Scripts Automáticos (Recomendado)

**Windows:**
```bash
.\start-dev.bat
```
Abre 2 terminais automaticamente: um para backend, outro para frontend.

**Linux/Mac:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Opção 2: Terminais Separados

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Output: 🚀 Backend: http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Output: ▲ Local: http://localhost:3000
```

### Opção 3: Com Porta Customizada

Se a porta 3001 estiver em uso:

```bash
cd backend
BACKEND_PORT=3002 npm run dev
```

Depois update no frontend: `NEXT_PUBLIC_API_URL=http://localhost:3002`

## 🧪 Testar Endpoints

### Health Check
```bash
curl http://localhost:3001/health
# Resposta: { "status": "ok", "database": "disconnected" }
```

### Testar Conexão com Banco
```bash
curl http://localhost:3001/api/test-db
# Resposta: { "status": "connected", "message": "Banco funcionando!" }
```

### Listar Pedidos
```bash
curl http://localhost:3001/api/pedidos
# Resposta: { "data": [...] }
```

### Criar Novo Pedido
```bash
curl -X POST http://localhost:3001/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "numero": "PED-001",
    "cliente_nome": "João Silva",
    "cliente_email": "joao@example.com",
    "descricao": "Teste",
    "valor": 1000
  }'
```

## 📱 Frontend

Abra no navegador: http://localhost:3000

Você verá:
- ✅ Página inicial com status da API
- 🟢 Se backend + DB estão conectados

## 🔧 Troubleshooting

### Porta em uso
```bash
# Windows
netstat -ano | findstr :3001

# Linux/Mac
lsof -i :3001

# Kill processo
kill -9 <PID>  # Linux/Mac
taskkill /PID <PID> /F  # Windows
```

### Variáveis de ambiente não carregam
```bash
# Verificar se .env existe
ls -la | grep .env

# Verificar conteúdo
cat .env
```

### Supabase não conecta
- Verificar URL em .env
- Verificar keys em .env
- Testar em: https://app.supabase.com

### Node modules corrompidos
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Fluxo de Desenvolvimento

### 1. Criar Feature
```bash
git checkout -b feat/nova-feature
```

### 2. Fazer Mudanças
```bash
# Editar arquivos
# Backend: backend/src/...
# Frontend: frontend/src/...
```

### 3. Testar Localmente
```bash
npm run dev  # em ambas as pastas
# Verificar no navegador: http://localhost:3000
```

### 4. Commit
```bash
git add .
git commit -m "feat: descrição da feature"
git push origin feat/nova-feature
```

### 5. Pull Request
- Abrir PR no GitHub
- Descrever mudanças
- Aguardar review

## 📚 Estrutura de Pastas

```
ccs-hub/
├── backend/
│   ├── src/
│   │   └── index.js          ← Server Express
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── app/              ← Next.js pages
│   │   │   ├── layout.js
│   │   │   ├── page.js
│   │   │   └── globals.css
│   │   └── lib/
│   │       └── supabase.js   ← Supabase client
│   ├── package.json
│   ├── next.config.js
│   └── tailwind.config.js
├── docs/                      ← Documentação
├── schema.sql                 ← Banco de dados
├── CLAUDE.md                  ← Contexto IA
├── .env                       ← Credenciais (gitignored)
└── .env.example               ← Template

```

## 🚀 Deploy

### Frontend (Vercel)
```bash
# Vercel detecta automaticamente
git push origin main
# Vercel faz deploy automaticamente
```

### Backend (Vercel)
```bash
# Similar ao frontend
# Vercel lê vercel.json
```

## 📖 Referências

- [CLAUDE.md](./CLAUDE.md) - Contexto para Claude Code
- [docs/CCS_HUB_SETUP_TECNICO.md](./docs/CCS_HUB_SETUP_TECNICO.md) - Setup detalhado
- [docs/00_INDICE.md](./docs/00_INDICE.md) - Índice completo

---

**Pronto para começar?** 🚀

```bash
./start-dev.bat  # Windows
# ou
./start-dev.sh   # Linux/Mac
```
