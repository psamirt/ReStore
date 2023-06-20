import React from 'react';
import Link from 'next/link';
import Boton from '../Button/Button';
import Image from 'next/image';

function Card(data) {
  return (
    <div className='w-80 md:w-64 lg:w-80 aspect-[4/3] grid gap-2 bg-slate-50 rounded-md p-6 shadow-lg shadow-slate-300 hover:scale-105 transition duration-500'>
      <div className='relative w-[85%]  mx-auto aspect-[4/3]'>
        <Image
          className='object-contain rounded-md'
          src={data.image}
          alt={data.name}
          fill
          sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
        />
      </div>
      <h3 className='text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap h-6'>
        {data.name}
      </h3>
      <div className='text-gray-500 text-sm'>
        <p>Estado: {data.estado} </p>
        <p>Marca: {data.marca}</p>
        <p>Categoria: {data.subcategorias}</p>
        <p className='font-medium text-lg text-slate-800'>
          Precio: ${data.precio}
        </p>
      </div>
      <Link className='grid' href={`/home/category/${data.id}`}>
        <Boton text='See more'></Boton>
      </Link>
    </div>
  );
}

export default Card;
