# 🚀 Deploy no Vercel - CCS Hub

## Pré-requisitos

- ✅ GitHub repo criado e atualizado
- ✅ Conta Vercel (conecte com GitHub)
- ✅ Variáveis de ambiente preparadas

---

## 📋 Passo a Passo

### 1. Fazer Push Final para GitHub

```bash
cd ccs-hub
git add -A
git commit -m "chore: preparar para deploy no Vercel"
git push origin main
```

### 2. Abrir Vercel

Acesse: https://vercel.com/dashboard

### 3. Criar Novo Projeto

**Opção A: Frontend (Recomendado começar por aqui)**

1. Clique: "Add New..." → "Project"
2. Selecione o repo: `ccs-hub`
3. Configure:
   - **Framework**: Next.js (auto-detectado)
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

4. **Environment Variables** (adicione):
   ```
   NEXT_PUBLIC_API_URL=https://seu-backend.vercel.app
   NEXT_PUBLIC_SUPABASE_URL=<seu-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-key>
   ```

5. Clique: "Deploy"
   - ✅ Frontend online em ~2 min

**Saiba a URL:**
```
https://ccs-hub-frontend.vercel.app (exemplo)
```

---

### 4. Deploy Backend

**Opção B: Backend**

1. Clique: "Add New..." → "Project"
2. Selecione o repo: `ccs-hub`
3. Configure:
   - **Root Directory**: `./backend`
   - **Framework**: Other (Node.js)
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

4. **Environment Variables** (adicione):
   ```
   SUPABASE_URL=<seu-url>
   SUPABASE_SERVICE_KEY=<sua-key>
   DEEPSEEK_API_KEY=<sua-key>
   NODE_ENV=production
   BACKEND_PORT=3000
   ```

5. Clique: "Deploy"
   - ✅ Backend online em ~2 min

**Saiba a URL:**
```
https://ccs-hub-backend.vercel.app (exemplo)
```

---

### 5. Atualizar Frontend com URL do Backend

Após o backend estar online:

1. Abra Vercel Dashboard
2. Selecione projeto Frontend
3. Settings → Environment Variables
4. Edite ou adicione:
   ```
   NEXT_PUBLIC_API_URL=https://ccs-hub-backend.vercel.app
   ```
5. Salve
6. Redeploy Frontend (Settings → Deployments)

---

## ✅ Verificar Deploy

### Frontend
```bash
curl https://ccs-hub-frontend.vercel.app
# Deve retornar HTML da página
```

### Backend
```bash
curl https://ccs-hub-backend.vercel.app/health
# Resposta: { "status": "ok", "database": "connected" }
```

### Dashboard
Abra: https://ccs-hub-frontend.vercel.app
- Deve exibir os 5 pedidos
- Status da API ✅

---

## 🔄 Workflow Após Deploy

### Para cada atualização:

1. Faça mudanças localmente
2. Teste: `npm run dev`
3. Commit e push:
   ```bash
   git add .
   git commit -m "feat: descrição"
   git push origin main
   ```
4. Vercel detecta mudança e faz redeploy automático ✅

---

## 🚨 Troubleshooting

### Erro: "Module not found"
```bash
# No Vercel Console
npm install
npm run build
```

### Erro: "SUPABASE_URL undefined"
- Verificar se variáveis foram adicionadas
- Settings → Environment Variables
- Redeploy

### Erro: "Conexão recusada"
- Verificar NEXT_PUBLIC_API_URL
- Deve apontar para URL do backend
- Atualizar e redeploy

### Banco não conecta
- Verificar SUPABASE_URL e SUPABASE_SERVICE_KEY
- Testar em: https://app.supabase.com

---

## 📊 URLs Finais (Exemplo)

| Serviço | URL |
|---------|-----|
| Frontend | https://ccs-hub-frontend.vercel.app |
| Backend API | https://ccs-hub-backend.vercel.app |
| Supabase | https://app.supabase.com |
| GitHub | https://github.com/Snorlax2303/ccs-hub |

---

## 💡 Dicas

- **Versioning**: Vercel cria deploy para cada commit
- **Rollback**: Fácil reverter para deploy anterior
- **Logs**: Vercel → Project → Deployments → Logs
- **Analytics**: Vercel mostra performance
- **Bancos**: Supabase continua gerenciando dados

---

## 🎉 Pronto!

Após essas etapas:
- ✅ Frontend online e acessível
- ✅ Backend online e funcional
- ✅ Dashboard mostrando 5 pedidos reais
- ✅ Banco conectado
- ✅ Qualquer push atualiza automaticamente

**MVP da Semana 1 está ao vivo!** 🚀
