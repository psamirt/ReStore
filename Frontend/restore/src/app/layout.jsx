import './globals.css';

export const metadata = {
  title: 'Store',
  description: 'Encuentra los mejores productos en nuestro sitio!',
  keywords: 'ecommerce, tienda en línea, productos, compras',
};

export default function RootLayout({ children }) {
  return (
    <html className='bg-slate-100 text-slate-800 font-sans'>
      <body>{children}</body>
    </html>
  );
}
