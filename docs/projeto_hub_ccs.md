# 🚀 HUB CCS — ARQUIVO CONSOLIDADO COMPLETO
## Tudo que você precisa para começar com Claude Code

**Data:** 2026-05-04  
**Status:** Pronto para Implementação  
**Cronograma:** 4 semanas para MVP

---

## 📋 ÍNDICE RÁPIDO

1. [Setup Inicial (30 min)](#1-setup-inicial)
2. [Ralph Loop - Contexto Persistente](#2-ralph-loop)
3. [Arquitetura Completa](#3-arquitetura)
4. [Decisões de Implementação](#4-decisões)
5. [Schema do Banco (SQL)](#5-schema-sql)
6. [Estratégia de IA](#6-ia)
7. [Prompts para Claude Code](#7-prompts)
8. [Cronograma Detalhado](#8-cronograma)

---

# 1. SETUP INICIAL

## 1.1 Instalar Claude Code (Correto!)

```bash
# ✅ NOME CORRETO
npm install -g @anthropic-ai/claude-code

# Verificar
claude-code --version
# Retorna: claude-code version X.X.X
```

## 1.2 Criar Repositório GitHub

```bash
# 1. Em GitHub.com
# - Criar novo repositório: "ccs-hub"
# - Descrição: "Hub CCS - Ferramenta unificada de operações"
# - Público ou Privado (você escolhe)
# - Não adicione README, .gitignore, ou LICENSE (vamos criar)

# 2. No seu PC
mkdir C:\Users\PC\projects\ccs-hub
cd C:\Users\PC\projects\ccs-hub
git init
git remote add origin https://github.com/seu-user/ccs-hub.git
```

## 1.3 Autenticar GitHub

```bash
# Gerar token em: https://github.com/settings/tokens
# Permissões: repo, workflow, gist

# Configurar em Claude Code
claude-code auth github
# Colar o token: ghp_xxxxxxxxxxxxxxxx
```

## 1.4 Criar Supabase

```
1. Ir em: https://supabase.com
2. Sign Up (email)
3. Criar novo projeto:
   - Nome: ccs-hub-prod
   - Region: São Paulo (sp-seed)
   - Password: (salvar em local seguro)
4. Aguardar criação (~2 min)
5. Copiar credenciais:
   - SUPABASE_URL: https://xxxxx.supabase.co
   - SUPABASE_ANON_KEY: eyJxxxxx
   - SUPABASE_SERVICE_ROLE_KEY: eyJxxxxx
6. Salvar em arquivo .env (não comitar!)
```

## 1.5 Configurar Variáveis de Ambiente

Criar arquivo `.env` (nunca comitar):

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxxx

# DeepSeek (seu crédito)
DEEPSEEK_API_KEY=sk_live_xxxxxxxxx
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1

# App
PORT=3000
NODE_ENV=development
JWT_SECRET=seu-secreto-super-seguro-aleatorio
```

Criar arquivo `.env.local` (Next.js frontend):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxx
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

# 2. RALPH LOOP — Contexto Persistente

## O que é?

Arquivo que você **atualiza diariamente** com:
- Estado do projeto
- O que foi feito
- O que falta fazer
- Próximos passos

## Onde fica?

```
ccs-hub/
└── .ralph/
    └── context.md  ← Este arquivo
```

## Template Inicial

```markdown
# Ralph Loop - CCS Hub Project Context
**Data de Atualização: 2026-05-04**
**Semana: 1 de 4 (MVP)**

## 🎯 Objetivo Atual
Fase 1: Fundação - Backend + Frontend + Banco online

## 📊 Status do Projeto

### Checklist Semana 1 (Fundação)
- [ ] GitHub repo estruturado
- [ ] Supabase: conta + schema importado
- [ ] Backend: estrutura + 3 endpoints
- [ ] Frontend: layout básico + auth
- [ ] Deploy: Vercel online

## 🔑 Contexto Técnico Persistente

### Stack
- Frontend: Next.js (Vercel)
- Backend: Node.js + Express (Vercel)
- Database: Supabase PostgreSQL (16 tabelas)
- IA: DeepSeek API
- Chat: Chatwoot (Railway)
- Automação: n8n (RepoCloud - já existe)

### Decisões Críticas
1. **Chatwoot**: Self-hosted em Railway (não cloud)
2. **IA**: DeepSeek (não GPT-4) - seu crédito existente
3. **Google Sheets**: Fica como backup (lê 2x/semana via n8n)
4. **Fluxo**: Usuários podem repassar pedidos entre eles
5. **Alertas**: Configuráveis por usuário
6. **Equipamentos**: Mikrotik + Fortigate sempre juntos

### URLs Importantes
- GitHub: https://github.com/seu-user/ccs-hub
- Supabase: https://supabase.com/dashboard
- Vercel Backend: (ainda não)
- Vercel Frontend: (ainda não)

## 📝 Histórico de Progresso

**2026-05-04 (Hoje)**
- [x] Documentação completa criada
- [x] Arquitetura definida
- [x] Schema SQL pronto
- [ ] Primeiro setup (próximo)

## 🚀 Próximas Ações (em ordem)

### HOJE/AMANHÃ
1. [ ] GitHub repo clonado localmente
2. [ ] Claude Code instalado e autenticado
3. [ ] Supabase conta criada
4. [ ] .env configurado
5. [ ] Ralph Loop criado em .ralph/context.md

### SEMANA 1
1. [ ] Backend estrutura (Passo 1)
2. [ ] Schema Supabase executado
3. [ ] Endpoints GET /api/health, /api/pedidos
4. [ ] Deploy Vercel backend
5. [ ] Frontend estrutura
6. [ ] Auth integrada
7. [ ] Dashboard básico
8. [ ] Deploy Vercel frontend

## ❓ Perguntas em Aberto
- [ ] Qual email Supabase? seu-email@example.com
- [ ] GitHub user confirmado? seu-user/ccs-hub
- [ ] Quando fazer deploy de cada parte?

---

**IMPORTANTE**: Atualizar este arquivo TODOS os dias que trabalhar no projeto.
Depois de cada sessão, adicionar o que foi feito e o que falta.
```

---

# 3. ARQUITETURA

## 3.1 Visão Geral

```
USUÁRIO (Português)
    ↓
CLAUDE CODE (Automação)
├─ Cria arquivos
├─ Edita código
├─ Git commit + push automático
└─ Deploy automático (Vercel)
    ↓
┌───────────────────────────────────┐
│  Vercel Frontend (Next.js)         │
│  - Dashboard                       │
│  - Detalhe Pedido                  │
│  - Templates de Comunicação        │
│  - Rastreamento                    │
│  - Relatórios                      │
└────────────┬────────────────────┘
             ↓
┌────────────────────────────────────┐
│  Vercel Backend (Node.js)          │
│  - /api/pedidos                    │
│  - /api/cotacoes                   │
│  - /api/contratos                  │
│  - /api/equipamentos               │
│  - /api/ia/* (DeepSeek)            │
│  - /api/alertas                    │
│  - /api/relatorios                 │
└────────────┬────────────────────┘
             ↓
┌────────────────────────────────────┐
│  Supabase (PostgreSQL)             │
│  - 16 tabelas estruturadas         │
│  - Row Level Security (segurança)  │
│  - Real-time (Realtime)            │
│  - Auth integrada                  │
└────────────┬────────────────────┘
             ↓
    ┌───────┴───────┬─────────────┐
    ↓               ↓             ↓
┌──────────┐  ┌─────────┐  ┌──────────┐
│ Google   │  │ n8n     │  │ DeepSeek │
│ Sheets   │  │Repocloud│  │(IA)      │
│(backup)  │  │(exist.) │  │          │
└──────────┘  └─────────┘  └──────────┘

n8n workflows:
├─ Sincronização Google Sheets (2x/semana)
├─ Rastreamento Correios (2x/semana)
├─ Alertas diários (08:00)
└─ Chatwoot listener (tempo real)
```

## 3.2 Stack Escolhido

| Componente | Tecnologia | Custo | Por quê |
|-----------|-----------|-------|--------|
| Frontend | Next.js + React + Tailwind | FREE | Moderno, rápido, fácil |
| Backend | Node.js + Express | FREE | Compatível com Claude Code |
| Database | Supabase PostgreSQL | ~$5/mês | Managed, real-time, seguro |
| Deploy Frontend | Vercel | FREE | Automático com GitHub |
| Deploy Backend | Vercel | FREE | Automático com GitHub |
| Chat | Chatwoot (Railway) | ~$10/mês | Self-hosted, integrado |
| Automação | n8n (RepoCloud) | - | Você já tem! |
| IA | DeepSeek | ~$0.02/mês | Seu crédito existente |
| **TOTAL** | | **~$15/mês** | Económico |

---

# 4. DECISÕES DE IMPLEMENTAÇÃO

## 4.1 Fluxo de Trabalho (Repassar Pedidos)

```
JOÃO (Comercial) cotando
    ↓ [Enviar Cotação]
Aguarda resposta provedor
    ↓ [Status: Contratando]
JOÃO clica [Repassar para SILVA]
    ↓
SILVA (Contrato) recebe alerta
    ↓ [Recebido contrato]
Upload no hub
    ↓ [Status: 1DOC]
Jurídico trata
    ↓
Se precisa correção:
  └─ [Status: Contrato no Provedor]
  └─ SILVA clica [Repassar para JOÃO]
  └─ JOÃO fala com provedor de novo
    
Se aprovado:
  └─ [Status: Aguardando Assinatura]
  └─ João Luiz assina
  └─ [Status: Aguardando Agendamento]
  └─ SILVA clica [Repassar para PEDRO]
  └─ PEDRO faz todo agendamento
```

**Visibilidade:**
- Cada usuário vê seus pedidos + todos que foram repassados pra ele
- Podem consultar qualquer pedido (todos veem tudo)
- Histórico mostra quem repassou quando

## 4.2 Alertas (Configuráveis)

Default (padrão):
- Cotação expirada: 7 dias
- Contratando atrasado: 5 dias
- Equipamento preso: 3 dias
- Agendamento próximo: 2 dias
- Assinatura pendente: 10 dias

Cada usuário configura no Settings.

## 4.3 Relatórios

**Para Cliente (PDF):**
- Unidades entregues (data, velocidade, valor, status)
- Assinável digitalmente

**Para Interno:**
- Dashboard em tempo real (KPIs)
- Pendências urgentes
- Faturamento
- Gráficos de status

---

# 5. SCHEMA SQL

## 5.1 Tabelas Principais (16 total)

```sql
-- 1. USUÁRIOS
usuarios (id, email, nome, cargo, equipe, whatsapp, ativo, permissoes)

-- 2. PEDIDOS (Principal)
pedidos (id, pedido_numero, data_pedido, unidade_sicoob, endereco, 
         cidade, estado, velocidade, tipo_circuito, status, responsavel_id, ...)

-- 3. COTAÇÕES
cotacoes (id, pedido_id, provedor, valor_mensal, valor_instalacao,
          status, data_cotacao, url_proposta, ...)

-- 4. CONTRATOS
contratos (id, pedido_id, provedor_nome, data_envio_docs,
           status_contrato, status_juridico, url_contrato_pdf, ...)

-- 5. EQUIPAMENTOS (MK + FG)
equipamentos (id, pedido_id, tipo_mk, patrimonio_mk, numero_serie_mk,
              cod_rastreamento_mk, tipo_fg, patrimonio_fg, numero_serie_fg,
              cod_rastreamento_fg, status_logistica, data_entrega_efetiva, ...)

-- 6. AGENDAMENTOS
agendamentos (id, pedido_id, data_agendamento, periodo_agendamento,
              status_agendamento, tecnico_provedor_nome, chamado_otrs, ...)

-- 7. CADEIA_AJUDA
cadeia_ajuda (id, agendamento_id, status, data_necessidade, ...)

-- 8. HISTÓRICO_STATUS
historico_status (id, pedido_id, status_anterior, status_novo,
                  data_mudanca, usuario_id, motivo, ...)

-- 9. TRANSFER_HISTORICO (Repassar pedidos)
transfer_historico (id, pedido_id, usuario_de_id, usuario_para_id,
                    data_transferencia, motivo, status_no_momento, ...)

-- 10. CONVERSAS_CHATWOOT
conversas_chatwoot (id, pedido_id, conversation_id, provedor_contato,
                    ultima_mensagem, status, ...)

-- 11. FATURAMENTO
faturamento (id, pedido_id, data_entrega_final, valor_total_cliente,
             valor_total_provedor, margem, status, ...)

-- 12. ALERTAS
alertas (id, pedido_id, tipo, descricao, severidade, usuario_notificado_id,
         status, data_alerta, ...)

-- 13. ALERT_CONFIG (Configurações por usuário)
alert_config (id, usuario_id, alerta_cotacao_ativado, dias_cotacao_expirada,
              alerta_contratando_ativado, dias_contratando_atrasado,
              frequencia_notificacao, horario_notificacao, ...)

-- 14. RELATORIOS_GERADOS
relatorios_gerados (id, usuario_id, tipo, filtros, url_download,
                    data_geracao, ...)

-- 15. ANALISES_IA (DeepSeek)
analises_ia (id, pedido_id, tipo, entrada, resultado, usuario_confirmou,
             comentario_usuario, data_analise, ...)

-- 16. ATIVIDADES (Log)
atividades (id, pedido_id, usuario_id, tipo_atividade, descricao,
            dados, data_atividade, ...)
```

## 5.2 Relacionamentos

```
pedidos (1) ──→ (N) cotacoes
pedidos (1) ──→ (N) contratos
pedidos (1) ──→ (N) equipamentos
pedidos (1) ──→ (N) agendamentos
pedidos (1) ──→ (N) historico_status
pedidos (1) ──→ (N) conversas_chatwoot
pedidos (1) ──→ (N) faturamento
pedidos (1) ──→ (N) alertas
pedidos (1) ──→ (N) analises_ia
pedidos (1) ──→ (N) atividades
agendamentos (1) ──→ (N) cadeia_ajuda
usuarios (1) ──→ (N) pedidos (responsavel)
usuarios (1) ──→ (N) alertas
```

---

# 6. ESTRATÉGIA DE IA (DeepSeek)

## 6.1 6 Casos de Uso

### 1️⃣ Análise Automática de Contratos (CRÍTICO)
```
Input: PDF do contrato
Output: {
  status: "REVISÃO NECESSÁRIA",
  erros_criticos: ["Endereço errado", "Falta equipamentos"],
  avisos: ["Prazo vago"],
  dados_extraidos: {valor_mensal, velocidade, periodo, ...},
  recomendacao: "Devolver ao provedor",
  confianca: 0.92
}
```

### 2️⃣ Alertas Inteligentes (CRÍTICO)
```
Analisa histórico completo do pedido
Recomenda ação específica
"Ligar para Intelig amanhã 9am - histórico de atrasos 3 dias"
```

### 3️⃣ Geração Automática de Mensagens
```
Input: "Preciso cobrar contrato 5 dias atrasado"
Output: Mensagem pronta em tom profissional
```

### 4️⃣ Extração de Dados PDF
```
Upload de contrato → Extrai automaticamente:
- Provedor, Valor, Velocidade, Datas, Cláusulas, SLA
```

### 5️⃣ Análise de Viabilidade Técnica
```
Input: Endereço + tipo de link + localização
Output: Viabilidade + riscos + prazo realista
"Shopping mall - pode atrasar 20 dias"
```

### 6️⃣ Relatórios com Insights
```
Input: Dados do mês
Output: Gráficos + Análise automática
"João melhorou 35%, Claro está lento, oportunidade: 5 pedidos parados"
```

## 6.2 Endpoints de IA

```
POST /api/ia/analisar-contrato
POST /api/ia/gerar-alerta-inteligente
POST /api/ia/gerar-mensagem
POST /api/ia/extrair-dados-pdf
POST /api/ia/analisar-viabilidade
POST /api/ia/gerar-insights-relatorio
POST /api/ia/chatbot
```

---

# 7. PROMPTS PARA CLAUDE CODE

## Prompt 1: Backend Setup (Dia 1)

```
"Cria estrutura completa do backend em Node.js conforme nosso documento:
- arquivo src/server.js com Express básico (porta 3000)
- arquivo src/db/supabase.js com cliente Supabase
- arquivo src/api/pedidos.js com GET /api/pedidos e GET /api/pedidos/:id
- arquivo src/api/cotacoes.js com GET /api/cotacoes/:pedido_id
- arquivo src/api/contratos.js com GET, POST, PATCH
- arquivo src/middleware/auth.js com autenticação JWT
- arquivo src/middleware/cors.js com CORS
- arquivo .env.example com todas as variáveis
- arquivo package.json com dependências: express, cors, dotenv, @supabase/supabase-js, openai
- arquivo .gitignore com .env, node_modules, .DS_Store

Depois faz:
git add .
git commit -m '[CCS-Hub] Setup backend inicial'
git push origin main

E me retorna se conseguiu ou se precisa fazer algo diferente."
```

## Prompt 2: Executar Schema SQL (Dia 1-2)

```
"Executa o schema SQL no Supabase:
1. Conecta no Supabase via SUPABASE_SERVICE_ROLE_KEY
2. Lê o arquivo docs/CCS_HUB_SCHEMA_BANCO.sql (preciso passar esse arquivo)
3. Executa todas as 16 tabelas
4. Confirma que criou: usuarios, pedidos, cotacoes, contratos, equipamentos, agendamentos, cadeia_ajuda, historico_status, transfer_historico, conversas_chatwoot, faturamento, alertas, alert_config, relatorios_gerados, analises_ia, atividades

Mostra no final quantas tabelas foram criadas e se deu algum erro."
```

## Prompt 3: Frontend Setup (Dia 2)

```
"Cria estrutura Next.js do frontend:
- arquivo app/page.jsx com página inicial (login)
- arquivo app/layout.jsx com header, sidebar, footer
- arquivo app/dashboard/page.jsx com dashboard (vazio por enquanto)
- arquivo app/login/page.jsx com formulário de login (Supabase)
- arquivo components/Sidebar.jsx para navegação
- arquivo components/PedidoCard.jsx para mostrar um pedido
- arquivo components/Header.jsx com usuário logado
- arquivo lib/api.js com função fetch() para chamar backend
- arquivo lib/supabase.js com cliente Supabase auth
- arquivo .env.local.example
- arquivo tailwind.config.js já configurado

Depois faz:
git add .
git commit -m '[CCS-Hub] Setup frontend inicial'
git push origin main"
```

## Prompt 4: Deploy Vercel (Dia 2-3)

```
"Configura deploy automático no Vercel:
1. Cria arquivo vercel.json na raiz do backend com configuração correta
2. Cria arquivo vercel.json na raiz do frontend com configuração correta
3. Conecta ambos repositórios no Vercel (você faz via GUI)
4. Configura environment variables no Vercel:
   Backend: SUPABASE_URL, SUPABASE_ANON_KEY, DEEPSEEK_API_KEY, etc
   Frontend: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_API_URL
5. Faz primeiro deploy

Depois me retorna as URLs:"
```

---

# 8. CRONOGRAMA DETALHADO

## Semana 1: Fundação (Backend + Frontend Online)

### Segunda-feira (Backend)
```
Pedir ao Claude Code:
"Cria estrutura completa do backend conforme Prompt 1"

Resultado esperado:
✅ Estrutura criada
✅ Git commit + push
✅ Tudo pronto para SQL

Tempo: ~2 horas
```

### Terça-feira (SQL + Deploy Backend)
```
Pedir ao Claude Code:
1. "Executa schema SQL conforme Prompt 2"
2. "Configura deploy Vercel para backend conforme Prompt 4"

Resultado esperado:
✅ 16 tabelas criadas no Supabase
✅ Backend online em URL Vercel
✅ Endpoints funcionando

Tempo: ~2 horas
```

### Quarta-feira (Frontend)
```
Pedir ao Claude Code:
"Cria estrutura Next.js conforme Prompt 3"

Resultado esperado:
✅ Frontend estruturado
✅ Login integrado com Supabase
✅ Tudo pronto para deploy

Tempo: ~1.5 horas
```

### Quinta-feira (Deploy Frontend)
```
Pedir ao Claude Code:
"Configura deploy Vercel para frontend conforme Prompt 4"

Resultado esperado:
✅ Frontend online em URL Vercel
✅ Login funcionando
✅ Dashboard básico visualizável

Tempo: ~1 hora
```

### Sexta-feira (Review)
```
Testes:
1. Testar login (Supabase)
2. Testar GET /api/pedidos (vazio por enquanto, é normal)
3. Validar ambos deployments online
4. Atualizar Ralph Loop com status da semana

Tempo: ~2 horas (inclui testes manuais)
```

**Total Semana 1: ~8.5 horas de trabalho**

---

## Semana 2: Dados (Sincronização + Dashboard)

### Segunda-feira
```
Pedir ao Claude Code:
"Cria endpoint GET /api/pedidos completo que:
1. Conecta ao Supabase
2. Busca tabela pedidos com filtros opcionais
3. Retorna array de pedidos com paginação"

Depois:
"Insere 5 pedidos fake no Supabase para teste"

Resultado: Backend traz dados reais do Supabase
```

### Terça-feira
```
Pedir ao Claude Code:
"Cria página dashboard/page.jsx que:
1. Chama GET /api/pedidos via lib/api.js
2. Mostra lista de pedidos com cards
3. Cada card mostra: número, unidade, status, dias neste status
4. Loading state enquanto busca dados"

Resultado: Dashboard mostra pedidos reais
```

### Quarta-feira
```
Pedir ao Claude Code:
"Cria página pedidos/[id]/page.jsx que:
1. Recebe pedido_id como parâmetro
2. Chama GET /api/pedidos/:id
3. Mostra detalhe completo do pedido
4. Timeline de histórico (historico_status)
5. Abas: Cotação, Contrato, Equipamentos, Agendamento"

Resultado: Detalhe do pedido funcional
```

### Quinta-feira
```
Pedir ao Claude Code:
"Cria n8n workflow que:
1. Trigger: a cada 2 horas
2. Lê Google Sheets aba CCS-SICOOB
3. Compara com Supabase (pedido_numero)
4. Insere linhas novas como pedidos
5. Atualiza status se mudou na planilha
6. Sincroniza rastreamento equipamentos"

Resultado: Hub sincronizado com Sheets
```

### Sexta-feira
```
Testes de sincronização:
1. Adicionar novo pedido na planilha
2. Aguardar 2 horas (ou rodar fluxo manual)
3. Confirmar que aparece no hub
4. Atualizar Ralph Loop
```

**Total Semana 2: ~8 horas**

---

## Semana 3: IA (DeepSeek Integrada)

### Segunda-feira
```
Pedir ao Claude Code:
"Cria endpoint POST /api/ia/analisar-contrato que:
1. Recebe pedido_id e arquivo_pdf_url
2. Faz chamada à DeepSeek com system prompt customizado
3. Retorna análise: erros, avisos, dados, recomendação
4. Salva em tabela analises_ia"

Teste manual com contrato real.
```

### Terça-feira
```
Integra análise no frontend:
"Adiciona aba 'Análise IA' no detalhe do pedido que:
1. Mostra upload de contrato
2. Chama /api/ia/analisar-contrato
3. Mostra resultado: erros, avisos, dados extraídos
4. Botões: [Aceitar], [Devolver ao Provedor]"

Resultado: Análise automática de contratos funcionando
```

### Quarta-feira
```
Pedir ao Claude Code:
"Cria endpoint POST /api/ia/gerar-alerta-inteligente que:
1. Recebe pedido_id
2. Analisa histórico completo (historico_status, transferências, etc)
3. DeepSeek retorna: contexto, risco, recomendação, próximos_passos
4. Cria alerta automático"

Testa com 5 pedidos diferentes.
```

### Quinta-feira
```
Integra alertas inteligentes no dashboard:
"Cria componente AlertCard que mostra:
1. Tipo de alerta
2. Recomendação da IA
3. Próximos passos
4. Botão para seguir recomendação"

Resultado: Dashboard com alertas inteligentes
```

### Sexta-feira
```
Testes completos de IA:
1. Upload de contrato → análise automática ✅
2. Alerta gerado automaticamente ✅
3. Recomendações aparecem no dashboard ✅
4. Atualizar Ralph Loop
```

**Total Semana 3: ~8 horas**

---

## Semana 4: Refinamento (MVP Pronto)

### Segunda-feira
```
Templates de comunicação:
"Cria endpoint GET /api/templates que retorna
templates pré-preenchidos para:
1. Cotação (com variáveis {{endereco}}, {{velocidade}})
2. Cobrança (com variáveis {{parceiro}}, {{dias}})
3. Agendamento (com variáveis {{data}}, {{periodo}})
4. Cadeia de Ajuda"
```

### Terça-feira
```
Adiciona UI para templates:
"Cria componente TemplateGenerator que:
1. Mostra opções de templates
2. Preenche com dados do pedido automaticamente
3. Botões: [Copiar], [Enviar Email], [Enviar WhatsApp]"

Resultado: Usuário consegue gerar mensagens com 1 clique
```

### Quarta-feira
```
Repassar pedidos:
"Cria endpoint POST /api/pedidos/:id/transferir que:
1. Recebe usuario_para_id
2. Atualiza responsavel_id
3. Cria entry em transfer_historico
4. Cria alerta para novo responsável"

Depois integra no frontend com botão [Repassar para]
```

### Quinta-feira
```
Relatórios básicos:
"Cria endpoint GET /api/relatorios/mensal que:
1. Busca todos pedidos do mês
2. Conta: Cotadas, Contratadas, Entregues, Canceladas
3. Calcula: total faturado, atrasos, reagendamentos
4. Retorna JSON com dados para gráfico"

Cria página relatorios que mostra gráficos.
```

### Sexta-feira
```
Review & Polish:
1. Testar flow completo: criar → acompanhar → concluir
2. Validar todas páginas
3. Performance: carregar dashboard em <2s
4. Mobile: responsivo?
5. Atualizar Ralph Loop: MVP COMPLETO

Resultado: MVP funcional, equipe consegue usar!
```

**Total Semana 4: ~8 horas**

---

## Resumo do Cronograma

| Semana | Foco | Horas | Resultado |
|--------|------|-------|-----------|
| 1 | Fundação | 8.5h | Backend + Frontend online |
| 2 | Dados | 8h | Dashboard + Sincronização |
| 3 | IA | 8h | Análise contratos + Alertas |
| 4 | Refinamento | 8h | MVP Completo |
| **TOTAL** | | **32.5h** | **MVP Pronto** |

**Média: 2-3 horas/dia durante 4 semanas**

---

# PRÓXIMOS PASSOS AGORA

## ✅ Checklist Setup (Faça na Ordem)

### Hoje/Agora
- [ ] Instalar Claude Code: `npm install -g @anthropic-ai/claude-code`
- [ ] Criar repo GitHub: `seu-user/ccs-hub`
- [ ] Clonar localmente: `git clone ...`
- [ ] Criar conta Supabase
- [ ] Copiar credenciais Supabase para arquivo `.env`
- [ ] Criar pasta `.ralph/` e arquivo `context.md`
- [ ] Fazer primeira autenticação GitHub: `claude-code auth github`
- [ ] Iniciar Claude Code: `claude-code start`

### Primeira Conversa com Claude Code
```
Digitar este prompt EXATO:

"Vou passar todo contexto do projeto ccs-hub.
Este é um hub centralizado para gerenciar contratos de internet/MPLS para Sicoob.

Arquitetura:
- Frontend: Next.js (Vercel)
- Backend: Node.js (Vercel)
- Database: Supabase PostgreSQL (16 tabelas)
- IA: DeepSeek (análise de contratos)
- Chat: Chatwoot
- Automação: n8n (você já tem)

Próximo passo: Quero que você crie a estrutura completa do backend.
Espera aí que vou passar o documento completo."
```

Então copiar todo este documento e colar.

Depois pedir Prompt 1 (Backend Setup).

---

# RESUMO EXECUTIVO FINAL

**Você tem:**
- ✅ Arquitetura completa
- ✅ Ralph Loop setup
- ✅ Schema SQL (16 tabelas)
- ✅ 7 prompts prontos para Claude Code
- ✅ Cronograma de 4 semanas
- ✅ Instruções de setup GitHub/Supabase
- ✅ Estratégia de IA integrada

**Você precisa:**
- ✅ Instalar Claude Code
- ✅ Criar repo GitHub
- ✅ Criar conta Supabase
- ✅ Copiar este documento para Claude Code
- ✅ Começar com Prompt 1

**Resultado:**
- ✅ Semana 1: Backend + Frontend online
- ✅ Semana 2: Dashboard + Sincronização
- ✅ Semana 3: IA funcionando
- ✅ Semana 4: MVP pronto

**Custos:** ~$15/mês (você economiza R$50k em consultoria)

---

**Você tem TUDO. Agora é só começar.** 🚀

Boa sorte!
