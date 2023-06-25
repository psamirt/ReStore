import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Boton from '../Button/Button';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/actions';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CartItem({ productId, item, userId }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://re-store.onrender.com/categories/technology/Detail/${productId}`
      );
      setProduct(response.data.result[0]);
    };
    fetch();
  }, []);
  return (
    <>
      <hr className='h-px bg-gray-300 border-0 ' />
      <div className='grid grid-cols-2 justify-between  my-4'>
        <div className='grid gap-4 text-slate-800 content-center items-center'>
          <h2
            className='cursor-pointer underline'
            onClick={() => router.push(`/home/category/${productId}`)}
          >
            {product?.name}
          </h2>
          <p className='text-gray-500 text-sm'>{product?.Marca}</p>
          <p className='text-slate-800 font-semibold text-lg'>
            ${product?.precio}
          </p>
          <span>
            <Boton
              onClick={() => dispatch(removeFromCart(productId, userId))}
              secondary={true}
              text={'Eliminar'}
            />
          </span>
        </div>
        <div className='relative aspect-square justify-self-end shadow-slate-200 min-h-[160px]'>
          {product.background_image ? (
            <Image
              className='object-contain rounded-md '
              src={product?.background_image}
              alt={product?.name}
              fill
              sizes='160px'
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
