# Hub CCS — Estratégia de Desenvolvimento Integrado
## Claude + GitHub + Automação + Ralph Loop

---

## 1. ANÁLISE: CLAUDE CODE vs CURSOR vs ANTIGRAVITY

### Opção 1: Claude Code (Recomendado ✅)
**O que é:**
- CLI tool que você roda do terminal
- Integra Claude diretamente com seu código
- Pode editar arquivos automaticamente

**Vantagens:**
- ✅ Integração com GitHub via git (commits automáticos)
- ✅ Melhor para projetos grandes
- ✅ Você controla tudo (não é black-box)
- ✅ Funciona offline (localmente)
- ✅ Compatível com Ralph Loop nativo

**Desvantagens:**
- ❌ Precisa de setup inicial
- ❌ Linha de comando (não é GUI)

**Custo:** Usa sua cota Claude (seus tokens)

---

### Opção 2: Cursor (Bom, mas limitado)
**O que é:**
- VS Code com IA integrada (similar ao GitHub Copilot)
- Editor + chat integrado

**Vantagens:**
- ✅ GUI amigável
- ✅ Bom para edição rápida
- ✅ Integrado com git

**Desvantagens:**
- ❌ Limita controle de tokens/cotas
- ❌ Menos automação
- ❌ Vendor lock-in

**Custo:** Subscription ($20/mês) OU seus tokens Claude

---

### Opção 3: AntiGravity (Não recomendo para isso)
**O que é:**
- Plataforma no-code/low-code
- Boa para automação simples

**Desvantagens:**
- ❌ Não é ideal para desenvolvimento full-stack
- ❌ Overkill de features que não precisa
- ❌ Menor controle sobre código
- ❌ Integração GitHub complicada

**Custo:** Subscription mensal

---

## 2. RECOMENDAÇÃO: CLAUDE CODE + GITHUB INTEGRADO

### Por quê Claude Code?

```
┌─────────────────┐
│  Claude Code    │
│  (seu terminal) │
└────────┬────────┘
         │
    ┌────▼──────┐
    │  Você pede │ (natural language)
    │  no chat   │
    └────┬───────┘
         │
    ┌────▼────────────┐
    │ Claude edita:   │
    │ ✅ Cria arquivos│
    │ ✅ Modifica código
    │ ✅ Faz commits   │
    │ ✅ Push GitHub   │
    └────┬────────────┘
         │
    ┌────▼──────────┐
    │ GitHub repo   │
    │ atualizado    │
    └───────────────┘
```

**Fluxo ideal:**
1. Você escreve prompt em natural (português OK!)
2. Claude Code edita seus arquivos
3. Git commit automático
4. Push para GitHub
5. Vercel/Railway vê mudança → deploy automático

---

## 3. SETUP: CLAUDE CODE + GITHUB + RALPH LOOP

### 3.1 Pré-requisitos

```bash
# Instalar Claude Code
npm install -g claude-code

# Verificar instalação
claude-code --version

# Verificar git
git --version

# Ter Node.js
node --version
```

### 3.2 Configurar GitHub Token

```bash
# Gerar token em GitHub Settings → Developer settings → Personal access tokens
# Escopo: repo, workflow, gist (full control)

# Salvar token em variável de ambiente
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxx"
echo "export GITHUB_TOKEN='ghp_xxxxx'" >> ~/.bashrc
```

### 3.3 Estrutura de Projeto com Ralph Loop

```
ccs-hub/
├── .ralph/                     # ← Ralph Loop files
│   ├── state.json             # Estado do projeto
│   ├── context.md             # Contexto persistente
│   └── daily-summary.md       # Resumo diário
│
├── backend/
│   ├── src/
│   │   ├── api/
│   │   ├── lib/
│   │   ├── db/
│   │   └── middleware/
│   └── package.json
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── package.json
│
├── docs/
│   ├── ARQUITETURA.md
│   ├── DECISOES.md
│   └── ...
│
├── .claude-code.json          # Configuração Claude Code
├── .gitignore
├── README.md
└── package.json (monorepo)
```

### 3.4 Arquivo `.claude-code.json`

```json
{
  "projectName": "ccs-hub",
  "projectDescription": "Hub CCS - Ferramenta unificada de operações",
  "githubRepo": "seu-user/ccs-hub",
  "autoCommit": true,
  "autoPush": true,
  "commitPrefix": "[CCS-Hub] ",
  "branches": {
    "main": "production",
    "develop": "development"
  },
  "supabaseProject": "seu-projeto-supabase",
  "supabaseUrl": "https://xxxxx.supabase.co",
  "supabaseKey": "${SUPABASE_ANON_KEY}",
  "ralphLoopEnabled": true,
  "ralphLoopPath": ".ralph/",
  "ralphLoopUpdateDaily": true,
  "deploymentHooks": {
    "vercel": "https://api.vercel.com/v1/deployments",
    "railway": "webhook-url"
  }
}
```

### 3.5 Arquivo Ralph Loop: `.ralph/context.md`

Este é o arquivo **CRÍTICO** que você atualiza diariamente. Ele tem todo contexto do projeto.

```markdown
# Ralph Loop - CCS Hub Project Context
**Data de Atualização: 2026-05-04**
**Semana: 1 de 4 (MVP)**

## 🎯 Objetivo Atual
Fase 1: Fundação - Backend + Frontend + Banco online

## 📊 Status do Projeto

### Semana 1 (Fundação)
- [x] GitHub repo estruturado
- [ ] Supabase: conta + schema importado
- [ ] Backend: estrutura + 3 endpoints
- [ ] Frontend: layout básico + auth
- [ ] Deploy: Vercel online

### Componentes Implementados
- ✅ Estrutura inicial
- ✅ .env.example configurado
- ❌ Supabase schema (próximo)
- ❌ Endpoints CRUD (próximo)

## 🔑 Contexto Persistente

### Arquitetura
- Frontend: Next.js (Vercel)
- Backend: Node.js Express (Vercel)
- Database: Supabase PostgreSQL
- IA: DeepSeek API
- n8n: RepoCloud (existente)
- Chat: Chatwoot (Railway)

### Decisões Importantes
1. Chatwoot: Self-hosted (não cloud)
2. IA: DeepSeek (não GPT-4)
3. Google Sheets: Fica como backup (não é source of truth)
4. Fluxo: Usuários podem repassar pedidos entre eles
5. Alertas: Configuráveis por usuário

### Tabelas Principais (16 total)
```sql
- pedidos (principal)
- cotacoes
- contratos
- equipamentos (MK + FG sempre juntos)
- agendamentos
- cadeia_ajuda
- historico_status
- transfer_historico
- conversas_chatwoot
- faturamento
- alertas
- alert_config
- relatorios_gerados
- templates_comunicacao
- analises_ia
- atividades
```

### Variáveis de Ambiente Necessárias
**Backend:**
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxxx
DEEPSEEK_API_KEY=sk_live_xxxxxxxxx
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
PORT=3000
NODE_ENV=production
JWT_SECRET=seu-super-secreto
```

**Frontend:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxx
NEXT_PUBLIC_API_URL=https://seu-backend.vercel.app
```

## 📝 Histórico de Progresso

**2026-05-04 (Hoje)**
- Projeto iniciado
- Documentação completa criada
- 7 arquivos MD + SQL entregues
- Estrutura de projeto definida
- Ralph Loop iniciado

## 🚀 Próximas Ações (Ordem de Prioridade)

### HOJE
1. [ ] Criar repo GitHub
2. [ ] Executar schema.sql no Supabase
3. [ ] Setup backend inicial
4. [ ] Setup frontend inicial

### AMANHÃ
1. [ ] Integração Supabase-Backend
2. [ ] Endpoint GET /api/health
3. [ ] Auth integrada (Supabase)
4. [ ] Primeira página (login)

### SEMANA 1
1. [ ] Dashboard básico
2. [ ] GET /api/pedidos funcionando
3. [ ] Listar pedidos na interface
4. [ ] Deploy Vercel

### SEMANA 2
1. [ ] Sincronização Google Sheets (n8n)
2. [ ] Detalhe do pedido
3. [ ] Histórico/Timeline
4. [ ] Transferência entre usuários

### SEMANA 3
1. [ ] DeepSeek integrado
2. [ ] Análise de contratos
3. [ ] Alertas inteligentes
4. [ ] Rastreamento equipamentos

### SEMANA 4
1. [ ] Templates de comunicação
2. [ ] Relatórios básicos
3. [ ] Polishing
4. [ ] MVP pronto

## 💾 Arquivos Críticos
- Schema: `docs/CCS_HUB_SCHEMA_BANCO.sql`
- Arquitetura: `docs/CCS_HUB_ARQUITETURA_COMPLETA.md`
- IA: `docs/CCS_HUB_ESTRATEGIA_IA.md`
- Setup: `docs/CCS_HUB_SETUP_TECNICO.md`

## 🔗 Links
- GitHub: https://github.com/seu-user/ccs-hub
- Supabase: https://supabase.com/dashboard
- Vercel Backend: https://vercel.com/seu-user/ccs-hub-backend
- Vercel Frontend: https://vercel.com/seu-user/ccs-hub-frontend

## 🎓 Notas Técnicas
- n8n no RepoCloud continua igual (não mexe)
- Google Sheets continua igual (lê 2x/semana via n8n)
- Claude Code faz commits automáticos (não manual)
- Ralph Loop atualiza diariamente (você só edita este arquivo)

## ❓ Perguntas em Aberto
- [ ] Qual email usar para Supabase?
- [ ] GitHub user/repo definitivo?
- [ ] Quando fazer deploy (gradual ou tudo junto)?

---

**Atualizar este arquivo TODOS os dias que trabalhar no projeto.**
**Se Ralph Loop não conseguir fazer algo, deixar nota aqui.**
