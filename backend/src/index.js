import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

let supabase = null;
let dbConnected = false;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase inicializado');
} else {
  console.warn('⚠️ Credenciais Supabase não encontradas');
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', database: dbConnected ? 'connected' : 'disconnected' });
});

app.get('/api/test-db', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Supabase não configurado' });
    const { error } = await supabase.from('usuarios').select('count', { count: 'exact', head: true });
    if (error) {
      dbConnected = false;
      return res.status(500).json({ error: error.message });
    }
    dbConnected = true;
    res.json({ status: 'connected', message: 'Banco funcionando!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/pedidos', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Supabase não configurado' });
    const { data, error } = await supabase.from('pedidos').select('*').order('data_criacao', { ascending: false });
    if (error) throw error;
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/pedidos', async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Supabase não configurado' });
    const { numero, cliente_nome, cliente_email, descricao, valor } = req.body;
    const { data, error } = await supabase.from('pedidos').insert([{ numero, cliente_nome, cliente_email, descricao, valor }]).select();
    if (error) throw error;
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Backend: http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`🧪 Test DB: http://localhost:${PORT}/api/test-db\n`);
});
