# 🗄️ Setup Supabase — Passo a Passo

## 1️⃣ Criar Conta Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub (usa Snorlax2303)
4. Crie um novo projeto:
   - Name: `ccs-hub`
   - Database Password: crie uma senha forte
   - Region: Escolha o mais próximo (ex: us-east-1)
5. Aguarde ~2 minutos para criar

## 2️⃣ Obter Credenciais

1. Vá para Settings → API
2. Copie:
   - Project URL → SUPABASE_URL
   - anon public → SUPABASE_ANON_KEY
   - service_role secret → SUPABASE_SERVICE_KEY

3. Abra .env e preencha:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=ey...
SUPABASE_SERVICE_KEY=ey...
```

## 3️⃣ Criar o Schema do Banco

1. No Supabase, vá para SQL Editor
2. Clique em New Query
3. Abra docs/CCS_HUB_SCHEMA_BANCO.sql (se existir)
4. Cole TODO o conteúdo
5. Clique em Run

## ✅ Pronto!

Supabase está configurado. Próximo: SETUP_DEEPSEEK.md
