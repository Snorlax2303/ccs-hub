# Claude Code + Ralph Loop — Guia Prático
## Como Trabalhar Eficientemente no Projeto CCS Hub

---

## 1. SETUP INICIAL (Uma única vez)

### 1.1 Instalar Claude Code

```bash
# Opção 1: npm
npm install -g claude-code

# Opção 2: pip (se preferir Python)
pip install claude-code

# Verificar
claude-code --version
```

### 1.2 Autenticar com GitHub

```bash
# Criar token em https://github.com/settings/tokens
# Copiar o token

# Configurar
claude-code auth github --token ghp_xxxxxxxxxxxxxxxx

# Verificar
claude-code auth status
```

### 1.3 Autenticar com Supabase

```bash
# Seus dados Supabase
export SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_ANON_KEY="eyJxxxxxxxxx"
export SUPABASE_SERVICE_ROLE_KEY="eyJxxxxxxxxx"

# Verificar conectividade
claude-code db test-connection supabase
```

### 1.4 Clonar Repositório e Iniciar

```bash
# Clonar repo (após você criar no GitHub)
git clone https://github.com/seu-user/ccs-hub.git
cd ccs-hub

# Copiar arquivo Ralph Loop
cp RALPH_LOOP_TEMPLATE.md .ralph/context.md

# Iniciar Claude Code neste projeto
claude-code init
```

---

## 2. FLUXO DE TRABALHO DIÁRIO

### Cada dia que você trabalha no projeto:

```
┌─────────────────────────────┐
│ 1. Atualizar Ralph Loop     │
│    (editar .ralph/context.md)│
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│ 2. Pedir ao Claude Code     │
│    (descrever o que quer)    │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│ 3. Claude Code executa      │
│    (edita, cria, faz git)    │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│ 4. Vercel faz deploy auto   │
│    (ao detectar push)        │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│ 5. Você testa a mudança     │
│    (verifica que funcionou)  │
└────────────┬────────────────┘
             │
┌────────────▼────────────────┐
│ 6. Atualizar Ralph Loop     │
│    (marcar como concluído)   │
└─────────────────────────────┘
```

---

## 3. COMANDOS CLAUDE CODE (Seu Dia a Dia)

### 3.1 Iniciar Sessão

```bash
# Abrir Claude Code para este projeto
cd ~/projects/ccs-hub
claude-code start

# Claude Code fica "ouvindo" seus pedidos
```

### 3.2 Pedir para Criar Arquivo

```
Prompt: "Cria o arquivo backend/src/server.js com o servidor Express básico"

Claude Code vai:
1. ✅ Criar arquivo
2. ✅ Preencher com código
3. ✅ Git add + commit automático
4. ✅ Git push
```

### 3.3 Pedir para Editar Arquivo

```
Prompt: "Adiciona endpoint GET /api/health no servidor Express"

Claude Code vai:
1. ✅ Encontrar arquivo
2. ✅ Adicionar código
3. ✅ Commit + push
```

### 3.4 Pedir para Executar SQL

```
Prompt: "Executa o schema.sql no Supabase para criar todas as tabelas"

Claude Code vai:
1. ✅ Conectar ao Supabase
2. ✅ Executar schema.sql
3. ✅ Confirmar criação
```

### 3.5 Pedir para Deployar

```
Prompt: "Faz deploy do backend para Vercel"

Claude Code vai:
1. ✅ Verificar código
2. ✅ Fazer build
3. ✅ Push para Vercel
4. ✅ Aguardar deploy
5. ✅ Retornar URL
```

### 3.6 Pedir para Criar Fluxo n8n

```
Prompt: "Cria fluxo n8n que sincroniza Google Sheets com Supabase, 
         usando o schema que definimos"

Claude Code vai:
1. ✅ Acessar RepoCloud
2. ✅ Criar fluxo
3. ✅ Configurar triggers
4. ✅ Testar
```

---

## 4. RALPH LOOP — COMO FUNCIONA

### O que é Ralph Loop?

Ralph Loop é um arquivo que você **atualiza diariamente**. Ele tem:
- Estado do projeto
- O que foi feito
- O que ainda precisa fazer
- Contexto persistente (para Claude não esquecer)

### Por que é importante?

Claude usa Ralph Loop para:
- ✅ Lembrar o que foi feito antes
- ✅ Entender contexto do projeto
- ✅ Saber próximos passos
- ✅ Não refazer o que já existe
- ✅ Poupar tokens (Ralph Loop = contexto comprimido)

### Como Atualizar

**TODOS OS DIAS que trabalhar:**

```markdown
# Editar .ralph/context.md

## 📝 Histórico de Progresso

**2026-05-05 (Hoje)**
- [x] Criado arquivo backend/src/server.js
- [x] Integrado com Supabase
- [x] Endpoint GET /api/health funcionando
- [x] Deploy no Vercel feito
- [ ] Frontend ainda não iniciado

## 🚀 Próximas Ações

1. [x] Setup backend
2. [ ] Setup frontend (PRÓXIMO)
3. [ ] Sincronização Sheets
...

**Atualizar antes de sair do PC.**
```

---

## 5. EXEMPLO REAL: DIA 1

### Começo do Dia

```bash
# Abrir terminal
cd ~/projects/ccs-hub

# Atualizar Ralph Loop
nano .ralph/context.md
# Editar data e adicionar tarefas de hoje

# Iniciar Claude Code
claude-code start

# Claude Code está pronto para receber comandos
```

### Você digita:

```
"Cria estrutura completa do backend:
- arquivo server.js com Express
- arquivo db/supabase.js com cliente Supabase
- arquivo api/pedidos.js com primeiros endpoints
- arquivo middleware/auth.js com JWT
- arquivo .env.example
- package.json com dependências

Depois faz git commit com mensagem '[CCS-Hub] Setup backend inicial'"
```

### Claude Code executa:

```
1. ✅ Cria pasta src/api/
2. ✅ Cria src/server.js (Express)
3. ✅ Cria src/db/supabase.js
4. ✅ Cria src/api/pedidos.js
5. ✅ Cria src/middleware/auth.js
6. ✅ Cria .env.example
7. ✅ Cria package.json
8. ✅ Git add .
9. ✅ Git commit "[CCS-Hub] Setup backend inicial"
10. ✅ Git push origin main
11. ✅ Vercel detecta push → começa deploy automático
12. ✅ Retorna URL do site ao vivo
```

### Você testa:

```bash
# Visitar URL do Vercel
# Testar endpoint GET /api/health
# Confirmou que funciona ✅

# Agora editar Ralph Loop
nano .ralph/context.md
# Adicionar:
# - [x] Estrutura backend criada
# - [x] Deploy Vercel feito
# - [ ] Frontend (PRÓXIMO)

# Salvar e sair
```

---

## 6. EXEMPLOS DE PROMPTS (Copiar & Colar)

### Pedir Estrutura Inicial

```
"Cria estrutura de projeto Next.js no frontend/:
- arquivo app/page.jsx com layout básico
- arquivo app/layout.jsx com header
- arquivo components/Sidebar.jsx para navegação
- arquivo lib/api.js com cliente HTTP
- arquivo lib/supabase.js com autenticação
- tailwind.config.js já configurado
- .env.local.example com variáveis

Depois faz deploy no Vercel e me retorna URL"
```

### Pedir para Integrar Supabase

```
"Integra Supabase no backend:
1. Importa @supabase/supabase-js em db/supabase.js
2. Cria cliente com URL e KEY (via .env)
3. Cria função authenticate() que valida JWT
4. Cria função queryPedidos() que retorna todos os pedidos
5. Exporta funções para serem usadas nos endpoints

Testa se conecta bem no Supabase"
```

### Pedir para Executar Schema

```
"Executa o schema SQL no Supabase:
1. Lê arquivo docs/CCS_HUB_SCHEMA_BANCO.sql
2. Conecta ao Supabase
3. Executa todas as queries
4. Confirma que 16 tabelas foram criadas
5. Mostra resultado"
```

### Pedir para Criar Endpoint de IA

```
"Cria endpoint POST /api/ia/analisar-contrato:
1. Recebe { pedido_id, arquivo_pdf_url }
2. Valida que arquivo existe
3. Chama DeepSeek API com system prompt customizado
4. Parseia resposta JSON
5. Salva análise em tabela analises_ia
6. Retorna { status, erros, avisos, dados_extraidos, recomendacao }

Adiciona também exemplo no README de como chamar"
```

### Pedir para Criar Fluxo n8n

```
"No n8n (RepoCloud), cria fluxo que:
1. Trigger: a cada 2 horas
2. Lê Google Sheets aba CCS-SICOOB
3. Pega linhas novas (compara com Supabase)
4. Para cada linha nova:
   - Insere em pedidos
   - Cria entrada em historico_status
5. Se status mudou:
   - Atualiza pedido
6. Ao fim: manda notificação no Slack

Testa fluxo com dados fake e confirma"
```

---

## 7. DICAS DE TOKENS (Ralph Loop = Economia)

### SEM Ralph Loop (caro):

```
Cada dia você explica tudo de novo:
- Explicar arquitetura
- Explicar decisões
- Explicar o que foi feito
- Explicar próximos passos

= 5000+ tokens por conversa
```

### COM Ralph Loop (barato):

```
Cada dia você só:
- Atualizar Ralph Loop (100 tokens)
- Pedir o próximo passo (500 tokens)

= 600 tokens por conversa
= 80% economia!
```

---

## 8. CHECKLIST: SETUP COMPLETO

- [ ] Claude Code instalado (`npm install -g claude-code`)
- [ ] GitHub autenticado (`claude-code auth github`)
- [ ] Supabase credenciais configuradas (env vars)
- [ ] Repo criado em GitHub
- [ ] Repo clonado localmente
- [ ] Arquivo `.ralph/context.md` no projeto
- [ ] `.claude-code.json` no root
- [ ] Primeira sessão Claude Code iniciada (`claude-code start`)
- [ ] Vercel conectado ao GitHub
- [ ] Railway conectado (se for usar Chatwoot agora)

---

## 9. FLUXO SEMANA A SEMANA

### Semana 1: Fundação

**Monday**
```
Prompt: "Cria estrutura completa backend conforme docs/CCS_HUB_SETUP_TECNICO.md"
→ Claude Code cria tudo
→ Deploy automático
→ Atualizar Ralph Loop
```

**Tuesday**
```
Prompt: "Executa schema.sql no Supabase. Depois cria endpoints GET/POST /api/pedidos"
→ Tabelas criadas
→ Deploy automático
→ Atualizar Ralph Loop
```

**Wednesday**
```
Prompt: "Cria frontend Next.js conforme docs, integra com Supabase auth"
→ Frontend online
→ Login funcionando
→ Atualizar Ralph Loop
```

**Thursday**
```
Prompt: "Cria página de dashboard que lista pedidos via GET /api/pedidos"
→ Dashboard mostrando pedidos
→ Deploy automático
→ Atualizar Ralph Loop
```

**Friday (Review)**
```
Prompt: "Faz review: testa todos endpoints, confirma banco, valida deploy"
→ Tudo testado
→ Documentação atualizada
→ Ralph Loop finalizado semana
```

### Semana 2: Dados

**Monday-Friday: Similar ao fluxo acima**
- Sincronização Google Sheets (n8n)
- Detalhe do pedido
- Histórico/Timeline
- Transferência entre usuários

---

## 10. COMANDO FINAL (para hoje)

Quando você estiver pronto:

```bash
# Setup inicial (roda tudo)
claude-code setup --github seu-user/ccs-hub \
                   --supabase https://xxxxx.supabase.co \
                   --vercel seu-user/ccs-hub-backend

# Claude Code faz tudo:
# 1. ✅ Clona repo
# 2. ✅ Configura .env
# 3. ✅ Conecta Supabase
# 4. ✅ Conecta Vercel
# 5. ✅ Inicializa Ralph Loop
# 6. ✅ Pronto para primeira conversa
```

---

## 11. RESUMO: COMO FUNCIONA NA PRÁTICA

**Você:**
```
"Cria página de detalhes do pedido que mostra 
 - Status atual
 - Histórico completo de mudanças
 - Abas: Cotação, Contrato, Equipamentos, Agendamento
 Usa components reutilizáveis e estilo Tailwind"
```

**Claude Code:**
```
✅ Cria arquivo frontend/app/pedidos/[id]/page.jsx
✅ Cria components/PedidoDetalhes.jsx
✅ Cria components/PedidoTimeline.jsx
✅ Cria components/AbaCotacao.jsx
✅ Cria components/AbaContrato.jsx
✅ Cria components/AbaEquipamentos.jsx
✅ Cria components/AbaAgendamento.jsx
✅ Integra com API backend
✅ Faz commit "[CCS-Hub] Página de detalhes do pedido"
✅ Push para GitHub
✅ Vercel faz deploy
✅ Você testa em URL ao vivo
✅ Pronto! Próximo passo.
```

**Você atualiza Ralph Loop:**
```
- [x] Página de detalhes criada
- [x] Componentes criados
- [x] Deploy feito
- [ ] Formulário de edição (PRÓXIMO)
```

---

**Isso é eficiência máxima: você não escreve uma linha de código.**

**Você só:** 
- Pede o que quer (português OK!)
- Testa no navegador
- Atualiza Ralph Loop

**Claude Code faz:**
- Escrever código
- Fazer commits
- Fazer deploy
- Integrar tudo

---

**Pronto para começar? Use os comandos acima.** 🚀
