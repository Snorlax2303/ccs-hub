import './globals.css'

export const metadata = {
  title: 'CCS Hub',
  description: 'Hub de Gestão de Pedidos e Contratos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
