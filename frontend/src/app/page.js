'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [pedidos, setPedidos] = useState([])
  const [apiStatus, setApiStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verificar health
        const healthRes = await fetch('http://localhost:3002/health')
        const healthData = await healthRes.json()
        setApiStatus(healthData)

        // Buscar pedidos
        const pedidosRes = await fetch('http://localhost:3002/api/pedidos')
        const pedidosData = await pedidosRes.json()
        setPedidos(pedidosData.data || [])
      } catch (error) {
        console.error('Erro:', error)
        setApiStatus({ error: error.message })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalValor = pedidos.reduce((sum, p) => sum + (p.valor || 0), 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">CCS Hub</h1>
          <p className="text-gray-600 mt-1">Gestão de Pedidos e Contratos</p>
        </div>
      </header>

      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Status do Sistema</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600 text-sm">API Backend</p>
              <p className="text-lg font-semibold">
                {apiStatus?.error ? (
                  <span className="text-red-600">❌ Erro</span>
                ) : apiStatus ? (
                  <span className="text-green-600">✅ Conectada</span>
                ) : (
                  <span className="text-gray-400">...</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Banco de Dados</p>
              <p className="text-lg font-semibold">
                {apiStatus?.database === 'connected' ? (
                  <span className="text-green-600">✅ Conectado</span>
                ) : (
                  <span className="text-gray-400">...</span>
                )}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pedidos Carregados</p>
              <p className="text-lg font-semibold text-blue-600">{pedidos.length}</p>
            </div>
          </div>
        </div>

        {/* Resumo de Valores */}
        {pedidos.length > 0 && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-md p-6 mb-8 text-white">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-green-100 text-sm">Total de Pedidos</p>
                <p className="text-3xl font-bold">{pedidos.length}</p>
              </div>
              <div className="text-right">
                <p className="text-green-100 text-sm">Valor Total</p>
                <p className="text-3xl font-bold">
                  R$ {totalValor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabela de Pedidos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Lista de Pedidos</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-600">
              Carregando pedidos...
            </div>
          ) : pedidos.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              Nenhum pedido encontrado
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Número</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cliente</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Descrição</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Valor</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id} className="border-b border-gray-200 hover:bg-blue-50 transition">
                      <td className="px-6 py-4 text-sm font-semibold text-blue-600">{pedido.numero}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{pedido.cliente_nome}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{pedido.descricao}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-right text-gray-900">
                        R$ {pedido.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          {pedido.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">
                        {new Date(pedido.data_criacao).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-gray-700">
          <p>
            <strong>Backend:</strong> http://localhost:3002 {' '}
            <strong>Frontend:</strong> http://localhost:3000
          </p>
        </div>
      </div>
    </main>
  )
}
