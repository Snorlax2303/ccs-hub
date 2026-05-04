# Hub CCS — Estratégia de IA Integrada
## DeepSeek API + Casos de Uso Inteligentes

---

## 1. ANÁLISE: DEEPSEEK vs ALTERNATIVAS

### Opção 1: DeepSeek (Sua escolha ✅)
**Vantagens:**
- ✅ Você já tem API + crédito
- ✅ Custo muito baixo (~70% mais barato que GPT)
- ✅ Modelo DeepSeek-V3 é excelente para análise de texto
- ✅ Suporta vision (pode ler documentos PDF/imagens)
- ✅ Integração simples via API REST

**Desvantagens:**
- Latência um pouco maior que GPT-4 (mas aceitável)
- Menos maduro que OpenAI/Claude em alguns casos específicos

**Recomendação:** Use DeepSeek como principal. É a melhor relação custo-benefício para seu caso.

---

## 2. CASOS DE USO DE IA NO HUB CCS

### 🔴 CRÍTICO (Implementar na Fase 1)

#### 1.1 **Análise Automática de Contratos**
**Problema:** Jurídico precisa revisar manualmente cada contrato (lê PDF, checa dados, vê erros)

**Solução IA:**
- Upload do PDF no detalhe do pedido
- DeepSeek analisa o contrato automaticamente
- Retorna:
  ```json
  {
    "status": "REVISÃO NECESSÁRIA",
    "erros_criticos": [
      "Endereço cadastro diferente do esperado: 'Rua X' vs 'Rua Y'",
      "Valor mensal diverge: R$ 150 (contrato) vs R$ 120 (proposta)"
    ],
    "avisos": [
      "Contrato não referencia equipamentos (Mikrotik/Fortigate)",
      "Prazo de vigência não está claro"
    ],
    "dados_extraidos": {
      "provedor": "Intelig",
      "valor_mensal": 150.00,
      "valor_instalacao": 5000.00,
      "velocidade": "100 Mbps",
      "periodo_vigencia": "24 meses",
      "data_assinatura": null
    },
    "recomendacao": "Devolver ao provedor - corrigir endereço e equipamentos",
    "confianca": 0.92
  }
  ```

**Onde entra:**
- Upload de contrato → trigger automático
- Resultado em card na interface
- Jurídico confirma/rejeita sugestões
- Atalho: [Devolver ao Provedor com Sugestões] (gera msg automática)

**Economia:** 30-40% menos tempo por contrato

---

#### 1.2 **Geração Automática de Alertas Inteligentes**
**Problema:** Alertas genéricos (ex: "há 5 dias em Contratando")

**Solução IA:**
- Analisa todo o histórico do pedido
- Detecta padrões de atraso
- Recomenda ação específica

```json
{
  "pedido": 1234,
  "unidade": "Sicoob Brasília",
  "alerta": "Contratando há 7 dias",
  "analise": {
    "contexto": "Provedor (Intelig) já respondeu 2x com atraso de 3 dias",
    "risco": "ALTO - histórico de atrasos do provedor",
    "recomendacao": "Ligar para Intelig amanhã de manhã (9am)",
    "melhor_horario": "09:00-10:00",
    "telefone_sugerido": "+55 11 98765-4321",
    "proximos_passos": [
      "1. Confirmar recebimento da documentação",
      "2. Solicitar prazo final",
      "3. Se não cumprir em 2 dias, escalar para gerente"
    ]
  }
}
```

**Onde entra:**
- Dashboard → Alertas viram "cards inteligentes" com ação recomendada
- Botão: [Seguir Recomendação] → cria tarefa automática

**Economia:** Menos cobranças mal direcionadas, mais efetivas

---

#### 1.3 **Sugestão Automática de Mensagens (via Chatwoot)**
**Problema:** Usuário pensa em como escrever a mensagem para o parceiro

**Solução IA:**
- Usuário clica [Gerar Resposta] dentro do Chatwoot
- Descreve brevemente o que quer
- DeepSeek gera mensagem no tom certo

```
Usuário digita: "Preciso cobrar o contrato, ele está 5 dias atrasado"

IA retorna:
"Olá [NOME_PARCEIRO],

Tudo bem? Passamos para revisar a situação do contrato da unidade 
Sicoob em Brasília (Pedido #1234).

Vimos que você enviou os documentos na última terça, porém ainda não 
recebemos o contrato assinado. Seria possível ter um retorno até 
amanhã (dia XX)?

Qualquer dúvida, fico à disposição.

Att,
[SEU_NOME]"
```

**Onde entra:**
- Botão [IA Gera Sugestão] no Chatwoot
- Usuário revisa e envia (ou edita)

**Economia:** 5 minutos por mensagem

---

### 🟡 IMPORTANTE (Implementar na Fase 2)

#### 2.1 **Extração Automática de Dados de PDFs**
**Problema:** Toda vez que chega um contrato novo, alguém tem que ler e preencher dados manualmente

**Solução IA:**
- Upload do PDF → DeepSeek extrai:
  - Nome do provedor
  - Valor mensal/instalação
  - Velocidade
  - Datas importantes
  - Condições especiais
  - Cláusulas de rescisão

```json
{
  "dados_extraidos": {
    "provedor": "Intelig",
    "velocidade": "100 Mbps",
    "tipo_link": "Internet Dedicada",
    "valor_mensal": 150.00,
    "valor_instalacao": 5000.00,
    "periodo_vigencia": "24 meses",
    "data_vigencia_inicio": "2026-06-01",
    "data_vigencia_fim": "2028-06-01",
    "clausulas_importantes": [
      "Multa por rescisão antecipada: 50% do valor mensal restante",
      "SLA: 99.5%",
      "Suporte técnico: 24/7"
    ]
  },
  "campos_ja_preenchidos": true
}
```

**Onde entra:**
- Ao fazer upload do contrato → preenche automaticamente no form
- Usuário só valida e confirma

**Economia:** 10-15 minutos por contrato

---

#### 2.2 **Análise de Viabilidade Técnica**
**Problema:** Alguém precisa checar se o pedido é viável (endereço, tipo de link, etc)

**Solução IA:**
- DeepSeek analisa histórico de pedidos semelhantes
- Detecta possíveis bloqueios

```json
{
  "pedido": 1235,
  "viabilidade": "POSSÍVEL COM RESSALVAS",
  "analise": {
    "endereco": "Av. Brasil, 1000 - São Paulo",
    "tipo_link": "MPLS",
    "problemas_potenciais": [
      "Endereço em shopping mall - pode ter restrição de tráfego",
      "Último pedido similar neste shopping (ID #1200) enfrentou atraso de 20 dias"
    ],
    "solucao_sugerida": "Contatar gerenciador do shopping previamente para liberar acesso técnico",
    "prazo_realista": "35-40 dias (vs. 30 dias esperado)"
  }
}
```

**Onde entra:**
- Detalhe do pedido → aba "Análise"
- Mostra riscos e recomendações

---

#### 2.3 **Geração de Relatórios com Insights**
**Problema:** Relatórios são só números. Falta análise de tendências

**Solução IA:**
- DeepSeek lê relatório mensal
- Gera insights automáticos

```
RELATÓRIO MENSAL - MAIO 2026

📊 NÚMEROS:
- Pedidos cotados: 25
- Pedidos contratados: 18
- Pedidos entregues: 12
- Cancelados: 2
- Taxa de conversão: 72%

🤖 INSIGHTS (Gerados por IA):
✅ POSITIVO: Seu time está mais rápido. Tempo médio de cotação caiu de 
   8 dias (abril) para 6 dias (maio). Responsável: João Silva (+35% velocidade)

⚠️ ATENÇÃO: 3 unidades da região Nordeste tiveram atrasos >10 dias. 
   Provedor local (Claro) está lento. Recomendação: negociar com Vivo/Intelig 
   como alternativa nessa região.

💰 OPORTUNIDADE: 5 pedidos que entraram em "Contratando" estão paralisados 
   (> 7 dias). Se destravar, adiciona R$ 7.500/mês em receita. Prioridade: 
   Pedidos #1200, #1205, #1210.

🎯 PRÓXIMAS AÇÕES (segundo IA):
1. Reunião com Claro nordeste (segunda)
2. Cobrar 5 pedidos parados (terça)
3. Treinar novo especialista em MPLS (quarta)
```

**Onde entra:**
- Dashboard → Card de "Insights IA"
- Relatório PDF gerado automaticamente

---

### 🟢 NICE-TO-HAVE (Implementar na Fase 3)

#### 3.1 **Chatbot Interno (Q&A sobre Contratos)**
- Usuário pergunta: "Qual é o SLA da Intelig?"
- IA busca em contratos passados e responde

#### 3.2 **Previsão de Atrasos**
- Machine Learning (histórico de dados)
- Prevê chance de atraso antes de acontecer
- "Esse pedido tem 65% chance de atrasar se não for contratado até terça"

#### 3.3 **Otimização de Cobranças**
- Analisa melhor hora para cobrar cada parceiro
- "Intelig responde melhor às 10am"

#### 3.4 **Sugestão de Parceiros Alternativos**
- Baseado em histórico: "Para este pedido, Vivo é 40% mais rápido que Intelig"

---

## 3. ARQUITETURA DE IA

### 3.1 Fluxo Geral

```
┌─────────────────┐
│  Usuário Action │ (Upload PDF, Clica [IA Gera], etc)
└────────┬────────┘
         │
    ┌────▼────┐
    │ Backend  │ (Node.js)
    └────┬────┘
         │
         ├─► Validação
         │   (tamanho, tipo arquivo, etc)
         │
         └─► DeepSeek API Call
             ├─ System Prompt customizado
             ├─ Contexto (histórico, dados do pedido)
             ├─ Documento/dados a analisar
             └─ Temperature, tokens, etc
                      │
                      ▼
            ┌─────────────────┐
            │  DeepSeek API   │
            │ (seu crédito)   │
            └────────┬────────┘
                     │
            ┌────────▼────────┐
            │ Resposta JSON   │
            └────────┬────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    Salva no BD          Retorna para Interface
    (para histórico)              │
                          ┌───────▼──────┐
                          │ Usuário vê   │
                          │ Sugestão IA  │
                          └──────────────┘
```

### 3.2 Endpoints de IA

```
POST /api/ia/analisar-contrato
  Input: { pedido_id, arquivo_pdf_url }
  Output: { erros, avisos, dados_extraidos, recomendacao }

POST /api/ia/gerar-alerta-inteligente
  Input: { pedido_id }
  Output: { contexto, risco, recomendacao, proximos_passos }

POST /api/ia/gerar-mensagem
  Input: { pedido_id, tipo, descricao_breve }
  Output: { mensagem_sugerida, tom }

POST /api/ia/extrair-dados-pdf
  Input: { arquivo_pdf_url }
  Output: { campos_extraidos }

POST /api/ia/analisar-viabilidade
  Input: { endereco, tipo_link, coop, cidade }
  Output: { viabilidade, problemas, solucao, prazo_realista }

POST /api/ia/gerar-insights-relatorio
  Input: { periodo, dados_relatorio }
  Output: { insights, recomendacoes }

POST /api/ia/chatbot
  Input: { pergunta, contexto_pedido }
  Output: { resposta, fontes }
```

---

## 4. IMPLEMENTAÇÃO TÉCNICA

### 4.1 Setup DeepSeek

```env
# .env
DEEPSEEK_API_KEY=sk_live_xxxxxxxxxxxxxxx
DEEPSEEK_MODEL=deepseek-chat  # ou deepseek-coder se for código
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
```

### 4.2 Cliente Node.js

```javascript
// lib/deepseek.js
import OpenAI from 'openai';

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL,
});

// Função genérica de chamada
async function chamarIA(systemPrompt, userMessage, temperature = 0.7) {
  try {
    const response = await deepseek.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: temperature,
      max_tokens: 2000,
      top_p: 0.95,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Erro na chamada DeepSeek:', error);
    throw new Error('Falha ao processar com IA');
  }
}

export { deepseek, chamarIA };
```

### 4.3 Exemplo: Análise de Contrato

```javascript
// api/ia/analisar-contrato
import { chamarIA } from '@/lib/deepseek';
import { PDFDocument } from 'pdfjs-dist';

export async function POST(req) {
  const { pedido_id, arquivo_pdf_url } = await req.json();

  // 1. Buscar dados do pedido no banco
  const pedido = await supabase
    .from('pedidos')
    .select('*')
    .eq('id', pedido_id)
    .single();

  // 2. Ler PDF e extrair texto
  const pdfText = await extrairTextoPDF(arquivo_pdf_url);

  // 3. Chamar IA com contexto específico
  const systemPrompt = `
Você é um especialista jurídico analisando contratos de internet/MPLS.
Sua tarefa é:
1. Verificar se os dados do contrato batem com os esperados
2. Listar erros críticos que DEVEM ser corrigidos
3. Listar avisos (coisas estranhas mas não críticas)
4. Extrair dados principais (valor, velocidade, datas)
5. Recomendar ação (aceitar, devolver ao provedor, solicitar mudanças)

Formato de resposta OBRIGATÓRIO (JSON válido):
{
  "status": "OK" | "REVISÃO NECESSÁRIA" | "RECUSAR",
  "erros_criticos": ["erro1", "erro2"],
  "avisos": ["aviso1", "aviso2"],
  "dados_extraidos": {
    "provedor": "...",
    "valor_mensal": 0,
    "valor_instalacao": 0,
    "velocidade": "...",
    "periodo_vigencia": "..."
  },
  "recomendacao": "...",
  "confianca": 0.95
}
`;

  const userMessage = `
DADOS ESPERADOS:
- Unidade: ${pedido.unidade_sicoob}
- Endereco: ${pedido.endereco}
- Velocidade: ${pedido.velocidade} Mbps
- Tipo: ${pedido.tipo_circuito}

CONTRATO RECEBIDO:
${pdfText.substring(0, 3000)} // Primeiros 3000 caracteres

Analise o contrato acima e compare com os dados esperados.
`;

  const resultado = await chamarIA(systemPrompt, userMessage, 0.3); // Menor temperatura = mais determinístico

  // 4. Parse resposta JSON
  const analise = JSON.parse(resultado);

  // 5. Salvar no banco (histórico)
  await supabase
    .from('analises_ia')
    .insert({
      pedido_id,
      tipo: 'analise_contrato',
      resultado: analise,
      data_analise: new Date(),
    });

  // 6. Retornar para interface
  return Response.json(analise);
}
```

---

## 5. COSTS & BUDGETING

### DeepSeek Pricing (2024)
- Input: $0.14 per 1M tokens
- Output: $0.28 per 1M tokens

### Estimativa de Uso Mensal

**Análise de Contratos:**
- 15 contratos/mês × ~2000 tokens = 30k tokens
- Custo: ~$0.01/mês

**Alertas Inteligentes:**
- 1 por dia × ~500 tokens = 15k tokens  
- Custo: ~$0.003/mês

**Geração de Mensagens:**
- 20 mensagens/mês × ~300 tokens = 6k tokens
- Custo: ~$0.002/mês

**Relatórios & Insights:**
- 4 por mês × ~3000 tokens = 12k tokens
- Custo: ~$0.004/mês

**TOTAL ESTIMADO: ~$0.02-0.03/mês** ✅ (quase zero!)

Seu crédito dura **ANOS** com esse uso.

---

## 6. TABELAS DE BANCO PARA IA

```sql
-- Histórico de análises IA
CREATE TABLE analises_ia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id),
  tipo TEXT, -- "analise_contrato", "alerta_inteligente", "mensagem_sugerida", etc
  entrada JSONB, -- o que foi enviado para IA
  resultado JSONB, -- o que IA retornou
  usuario_confirmou BOOLEAN, -- usuário aprovou sugestão?
  comentario_usuario TEXT,
  data_analise TIMESTAMP DEFAULT now()
);

-- Cache de prompts e configurações
CREATE TABLE ia_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT UNIQUE, -- "analise_contrato", "gerar_alerta", etc
  system_prompt TEXT, -- prompt que usamos
  temperatura DECIMAL(3,2) DEFAULT 0.7,
  max_tokens INT DEFAULT 2000,
  ativa BOOLEAN DEFAULT true,
  data_criacao TIMESTAMP DEFAULT now()
);

-- Feedback para melhorar modelos
CREATE TABLE ia_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analise_ia_id UUID REFERENCES analises_ia(id),
  tipo_feedback TEXT, -- "correto", "parcialmente_correto", "incorreto"
  comentario TEXT,
  usuario_id UUID REFERENCES usuarios(id),
  data_feedback TIMESTAMP DEFAULT now()
);
```

---

## 7. INTERFACE (MOCKUP)

### Detalhe do Pedido - Aba "Contrato"

```
┌──────────────────────────────────────────┐
│ CONTRATO                                 │
├──────────────────────────────────────────┤
│ Status: Em Análise (Jurídico)            │
│                                          │
│ [Upload Novo PDF] [Histórico de Versões]│
│                                          │
│ ARQUIVO ATUAL: contrato_intelig_v2.pdf  │
│                                          │
│ ┌──────────────────────────────────────┐│
│ │ 🤖 ANÁLISE IA (Automática)           ││
│ ├──────────────────────────────────────┤│
│ │ Status: ⚠️ REVISÃO NECESSÁRIA       ││
│ │ Confiança: 92%                      ││
│ │                                      ││
│ │ ❌ ERROS CRÍTICOS:                  ││
│ │   • Endereço cadastro errado        ││
│ │   • Falta referência a equipamentos ││
│ │                                      ││
│ │ ⚠️ AVISOS:                          ││
│ │   • Cláusula de rescisão está vaga  ││
│ │                                      ││
│ │ ✅ DADOS EXTRAÍDOS:                 ││
│ │   Provedor: Intelig                 ││
│ │   Valor Mensal: R$ 150.00           ││
│ │   Instalação: R$ 5.000.00           ││
│ │   Velocidade: 100 Mbps              ││
│ │   Vigência: 24 meses (jun/26-jun/28)││
│ │                                      ││
│ │ 🎯 RECOMENDAÇÃO:                    ││
│ │ "Devolver ao provedor. Corrigir:    ││
│ │  1. Endereço da sede (Av. Brasil)   ││
│ │  2. Adicionar descrição dos         ││
│ │     equipamentos (MK + FG)"         ││
│ │                                      ││
│ │ [Devolver c/ Sugestões] [Aceitar]   ││
│ └──────────────────────────────────────┘│
│                                          │
│ HISTÓRICO DE ANÁLISES:                  │
│ • v1 (10/05): 3 erros críticos          │
│ • v2 (12/05): 1 erro crítico (agora)    │
└──────────────────────────────────────────┘
```

---

## 8. ROADMAP DE IA

### Semana 1-2 (Fase 1)
- [ ] Setup DeepSeek API
- [ ] Endpoint: Análise de Contrato
- [ ] Endpoint: Alerta Inteligente
- [ ] Testes com contratos reais

### Semana 3-4 (Fase 2)
- [ ] Endpoint: Extrair Dados PDF
- [ ] Endpoint: Gerar Mensagem
- [ ] Endpoint: Análise Viabilidade
- [ ] Interface: Cards de sugestão

### Semana 5-6 (Fase 3)
- [ ] Relatórios com Insights
- [ ] Chatbot Q&A
- [ ] Machine Learning (previsão atrasos)
- [ ] Otimização de prompts

---

## 9. BOAS PRÁTICAS & SEGURANÇA

### ✅ O que fazer:
- Sempre validar entrada antes de enviar à IA
- Cache de respostas (não chamar 2x para a mesma análise)
- Logging de todas as chamadas (custo + debug)
- Feedback do usuário (ajuda melhorar)

### ❌ O que NÃO fazer:
- Enviar dados sensíveis (CPF, CNPJ) direto para IA
- Confiar 100% em IA (sempre revisão humana)
- Deixar IA fazer ação sem aprovação

### 🔒 Segurança:
- API key em variável de ambiente (.env)
- Nunca comitar .env no git
- Logar todas as requisições
- Rate limit (máx 10 req/minuto por usuário)

---

## 10. COMPARAÇÃO: DEEPSEEK vs GPT-4 vs CLAUDE

| Aspecto | DeepSeek | GPT-4 | Claude 3 |
|---------|----------|-------|---------|
| **Análise Contrato** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Custo** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **Latência** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Você já tem** | ✅ SIM | ❌ Não | ❌ Não |
| **Recomendação** | **USE** | Se budget permitir | Se quiser alternativa |

**Conclusão:** DeepSeek é a melhor escolha para você agora. GPT-4 seria só 5% melhor, custando 10x mais.

---

## 11. PRÓXIMOS PASSOS

1. **Você confirma:** "Tá bom, vamos com DeepSeek"
2. **Eu crio:**
   - Arquivo `lib/deepseek.js` (cliente)
   - Endpoints `/api/ia/*` (rotas)
   - System prompts otimizados (por caso de uso)
   - Testes com contratos de verdade
3. **Você testa:**
   - Faz upload de um contrato real
   - Vê a análise funcionar
   - Valida os resultados

---

**Quer começar com a análise automática de contratos?** Essa é a que traz mais valor imediato. 🚀
