-- ============================================
-- CCS HUB - SCHEMA INICIAL
-- ============================================

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  cargo VARCHAR(100),
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero VARCHAR(50) UNIQUE NOT NULL,
  cliente_nome VARCHAR(255) NOT NULL,
  cliente_email VARCHAR(255),
  descricao TEXT,
  valor DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pendente', -- pendente, processando, concluido, cancelado
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id UUID REFERENCES usuarios(id)
);

-- Tabela de Contratos
CREATE TABLE IF NOT EXISTS contratos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero VARCHAR(50) UNIQUE NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  data_inicio DATE,
  data_vencimento DATE,
  valor DECIMAL(12, 2),
  status VARCHAR(50) DEFAULT 'ativo', -- ativo, expirado, cancelado
  conteudo TEXT, -- Armazena o conteúdo do contrato (pode ser base64 de PDF)
  analise_ia JSONB, -- Resultado da análise por IA
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id UUID REFERENCES usuarios(id)
);

-- Tabela de Alertas
CREATE TABLE IF NOT EXISTS alertas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo VARCHAR(50) NOT NULL, -- vencimento, risco, novo_pedido, etc
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  contrato_id UUID REFERENCES contratos(id),
  pedido_id UUID REFERENCES pedidos(id),
  lido BOOLEAN DEFAULT FALSE,
  ativo BOOLEAN DEFAULT TRUE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id UUID REFERENCES usuarios(id)
);

-- Tabela de Templates
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(100),
  conteudo TEXT NOT NULL,
  tags VARCHAR(500),
  ativo BOOLEAN DEFAULT TRUE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario_id UUID REFERENCES usuarios(id)
);

-- Tabela de Configurações de Alertas
CREATE TABLE IF NOT EXISTS configuracoes_alerta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  dias_antes_vencimento INTEGER DEFAULT 7,
  notificar_email BOOLEAN DEFAULT TRUE,
  notificar_sistema BOOLEAN DEFAULT TRUE,
  ativo BOOLEAN DEFAULT TRUE,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_contratos_usuario ON contratos(usuario_id);
CREATE INDEX idx_contratos_status ON contratos(status);
CREATE INDEX idx_contratos_vencimento ON contratos(data_vencimento);
CREATE INDEX idx_alertas_usuario ON alertas(usuario_id);
CREATE INDEX idx_alertas_lido ON alertas(lido);
CREATE INDEX idx_templates_usuario ON templates(usuario_id);

-- ============================================
-- PERMISSÕES (Row Level Security)
-- ============================================

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes_alerta ENABLE ROW LEVEL SECURITY;

-- Políticas básicas de RLS
-- Usuários só veem seus próprios dados
CREATE POLICY "usuarios_own_data" ON usuarios
  FOR ALL USING (auth.uid()::text = id::text);

CREATE POLICY "pedidos_own_data" ON pedidos
  FOR ALL USING (usuario_id = auth.uid());

CREATE POLICY "contratos_own_data" ON contratos
  FOR ALL USING (usuario_id = auth.uid());

CREATE POLICY "alertas_own_data" ON alertas
  FOR ALL USING (usuario_id = auth.uid());

CREATE POLICY "templates_own_data" ON templates
  FOR ALL USING (usuario_id = auth.uid());

CREATE POLICY "config_alerta_own_data" ON configuracoes_alerta
  FOR ALL USING (usuario_id = auth.uid());
