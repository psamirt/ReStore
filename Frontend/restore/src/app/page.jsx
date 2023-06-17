import Link from 'next/link';


export default function Landing() {
  return (
    <main className='relative h-screen bg-yellow-50'>
      <div
        className='absolute z-10 top-1/2 left-1/2 text-center '
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <h1 className='text-5xl text-stone-600 mb-8'>Bienvenido a ReStore</h1>
        <Link
          className='bg-yellow-500 bg- hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition'
          href={'/home'}
        >
          Llevame al shop
        </Link>
      </div>
    </main>
  );
}
