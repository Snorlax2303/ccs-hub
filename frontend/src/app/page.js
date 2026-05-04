'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [apiHealth, setApiHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:3001/health')
        const data = await response.json()
        setApiHealth(data)
      } catch (error) {
        console.error('Erro ao conectar com API:', error)
        setApiHealth({ error: error.message })
      } finally {
        setLoading(false)
      }
    }

    checkHealth()
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CCS Hub</h1>
        <p className="text-gray-600 mb-8">Gestão de Pedidos e Contratos</p>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Status da API</h2>
            {loading ? (
              <p className="text-gray-600">Verificando...</p>
            ) : apiHealth?.error ? (
              <p className="text-red-600 text-sm">{apiHealth.error}</p>
            ) : (
              <div>
                <p className="text-green-600 text-sm">✅ API conectada</p>
                <p className="text-gray-600 text-sm">
                  Banco: {apiHealth?.database === 'connected' ? '✅ Pronto' : '❌ Desconectado'}
                </p>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600 space-y-2">
            <p>• Backend: http://localhost:3001</p>
            <p>• Frontend: http://localhost:3000</p>
            <p>• Status: 🚀 Em desenvolvimento</p>
          </div>
        </div>
      </div>
    </main>
  )
}
