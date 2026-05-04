# CCS Hub - Contexto para Claude Code

## Visão Geral
Sistema de gestão de pedidos e contratos com análise inteligente usando IA (DeepSeek).

## Stack Tecnológico
- **Frontend**: Next.js 14 + React 18 + Tailwind CSS
- **Backend**: Node.js/Express
- **Database**: Supabase (PostgreSQL)
- **IA**: DeepSeek API
- **Hosting**: Vercel (Frontend), Vercel (Backend), Railway (opcional)

## Variáveis de Ambiente
Veja `.env.example` para template completo. Copie para `.env` (não é commitado).

```bash
cp .env.example .env
# Preencha com suas credenciais Supabase e DeepSeek
```

## Estrutura do Projeto
```
ccs-hub/
├── backend/
│   ├── src/
│   │   └── index.js (Express server com 3 endpoints básicos)
│   ├── package.json
│   └── .env (credenciais)
├── frontend/
│   ├── src/
│   │   ├── app/ (Next.js pages)
│   │   └── lib/ (utilitários, Supabase client)
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── docs/
│   ├── 00_INDICE.md
│   ├── CCS_HUB_RESUMO_EXECUTIVO.md
│   ├── CCS_HUB_SETUP_TECNICO.md
│   ├── CCS_HUB_ESTRATEGIA_IA.md
│   └── ... (9 documentos no total)
├── schema.sql (banco de dados)
├── .env (credenciais - NÃO COMMITAR)
└── .gitignore
```

## Roadmap (4 semanas)
### Semana 1: Fundação
- [x] Criar estrutura backend + frontend
- [ ] Importar schema SQL no Supabase
- [ ] Configurar autenticação (Supabase Auth)
- [ ] Testar conexão com banco de dados
- [ ] Deploy inicial (Vercel)

### Semana 2: Dados & Fluxo
- [ ] Endpoint GET/POST para pedidos
- [ ] Dashboard com lista de pedidos
- [ ] Integração Google Sheets (n8n)
- [ ] Sincronização de 700 pedidos

### Semana 3: IA & Automações
- [ ] Integração DeepSeek
- [ ] Endpoint `/api/ia/analisar-contrato`
- [ ] Análise automática de contratos
- [ ] Interface para upload de PDFs

### Semana 4: Refinamento
- [ ] Templates de mensagens
- [ ] Repassar pedidos entre usuários
- [ ] Rastreamento visual
- [ ] Testes com equipe real

## Como Trabalhar com Isso
1. **Leia** os documentos em `docs/` para entender o projeto completo
2. **Faça commits** frequentes com mensagens claras
3. **Teste** cada endpoint antes de avançar
4. **Update .env.example** quando adicionar novas variáveis
5. **Deploy** no Vercel após cada feature importante

## Endpoints Básicos (funcionando)
- `GET /health` - Health check
- `GET /api/test-db` - Testa conexão com banco
- `GET /api/pedidos` - Lista todos pedidos
- `POST /api/pedidos` - Cria novo pedido

## Próximos Passos Imediatos
1. Importar schema SQL no Supabase
2. Configurar autenticação
3. Instalar dependências (npm install)
4. Testar conexão com banco de dados
5. Deploy no Vercel

## Notas Importantes
- ⚠️ `.env` nunca deve ser commitado (está em .gitignore)
- 📚 Todos os 16 documentos estão em `docs/`
- 🗂️ Schema SQL pronto para importar: `docs/CCS_HUB_SCHEMA_BANCO.sql`
- 🚀 DeepSeek já configurado nas variáveis
- 💾 Supabase com credenciais prontas

## Documentação Referência
- **Resumo Executivo**: docs/CCS_HUB_RESUMO_EXECUTIVO.md
- **Setup Técnico**: docs/CCS_HUB_SETUP_TECNICO.md
- **Estratégia IA**: docs/CCS_HUB_ESTRATEGIA_IA.md
- **Índice Completo**: docs/00_INDICE.md
