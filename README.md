# 🎯 CCS Hub

Sistema completo de **gestão de pedidos e contratos** com **análise inteligente de IA**.

## 🚀 Features

- ✅ Dashboard com lista de pedidos (700+ pedidos)
- ✅ Análise automática de contratos com IA (DeepSeek)
- ✅ Sincronização com Google Sheets via n8n
- ✅ Chat integrado (Chatwoot)
- ✅ Alertas configuráveis
- ✅ Rastreamento de equipamentos
- ✅ API RESTful documentada

## 💰 Custos Mensais

| Serviço | Custo | Status |
|---------|-------|--------|
| Vercel | FREE | ✅ |
| Supabase | ~$5 | ✅ |
| Railway | ~$10 | ✅ |
| DeepSeek | ~$0.02 | ✅ |
| **TOTAL** | **~$15/mês** | ✅ |

## 🛠 Stack Tecnológico

```
Frontend: Next.js 14 + React 18 + Tailwind CSS
Backend:  Node.js + Express
Database: Supabase (PostgreSQL)
IA:       DeepSeek API
Hosting:  Vercel + Railway
```

## 📁 Estrutura do Projeto

```
ccs-hub/
├── frontend/          # Next.js app
├── backend/           # Express API
├── docs/              # 9 documentos de referência
├── schema.sql         # Banco de dados (16 tabelas)
├── .env               # Variáveis de ambiente
├── CLAUDE.md          # Contexto para Claude Code
└── README.md          # Este arquivo
```

## 🚀 Quick Start

### 1. Instalar Dependências

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configurar Variáveis de Ambiente

Copiar `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 3. Importar Schema no Supabase

1. Abrir Supabase Console
2. Query Editor → Nova Query
3. Copiar conteúdo de `schema.sql`
4. Executar

### 4. Rodar Localmente

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# http://localhost:3000
```

## 📖 Documentação

- **[CLAUDE.md](./CLAUDE.md)** - Contexto para Claude Code
- **[docs/CCS_HUB_RESUMO_EXECUTIVO.md](./docs/CCS_HUB_RESUMO_EXECUTIVO.md)** - Visão geral (10 min)
- **[docs/CCS_HUB_SETUP_TECNICO.md](./docs/CCS_HUB_SETUP_TECNICO.md)** - Setup completo
- **[docs/CCS_HUB_ESTRATEGIA_IA.md](./docs/CCS_HUB_ESTRATEGIA_IA.md)** - Casos de uso IA
- **[docs/00_INDICE.md](./docs/00_INDICE.md)** - Índice de tudo

## 🎯 Roadmap (4 Semanas)

- **Semana 1**: Fundação (Backend + Frontend + Banco)
- **Semana 2**: Dados (Sincronizar 700 pedidos)
- **Semana 3**: IA (Análise de contratos)
- **Semana 4**: Refinamento (MVP completo)

## 🔗 Links Importantes

- [Supabase Console](https://app.supabase.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [DeepSeek API](https://api.deepseek.com)
- [GitHub Repo](https://github.com/Snorlax2303/ccs-hub)

## 📞 Suporte

Veja os documentos em `docs/` para documentação completa.

---

**Status**: 🚀 MVP em desenvolvimento  
**Próximo milestone**: Semana 1 - Fundação completa
