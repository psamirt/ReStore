import './globals.css'

export const metadata = {
  title: 'Store',
  description: 'Encuentra los mejores productos en nuestro sitio!',
  keywords: 'ecommerce, tienda en línea, productos, compras',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        </body>
    </html>
  )
}
