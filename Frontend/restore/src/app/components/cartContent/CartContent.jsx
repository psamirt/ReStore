'use client';
import React, { useEffect, useState } from 'react';
import Boton from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../cartItem/CartItem';
import { useRouter } from 'next/navigation';
import { addFromDatabase } from '@/redux/actions';
import { useSession } from 'next-auth/react';

export default function CartContent() {
  const { cart } = useSelector((store) => store);
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(cart);

  const dispatch = useDispatch();
  useEffect(() => {
    //chequear si esta logeado el user, si lo esta poblar el carrito con sus prods
    //se puede hacer una action que reciba muchos prod en el payload y que haga ...state, cart: [...state.cart, ...action.payload]
    if (session) {
      dispatch(addFromDatabase(cart, session.user.id));
    }
  }, [session]);

  return (
    <div className='container px-4 m-auto my-8'>
      <button onClick={() => dispatch(addFromDatabase())}>
        {/* probar database */}
      </button>
      <h1 className='text-3xl  mb-4 font-semibold text-blue-900'>Carrito</h1>
      {cart?.length ? (
        //va a haber que fetchear la info de cada producto segun su id, ya sea aca o en cartItem
        cart.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            {...item}
            userId={session?.user?.id}
          />
        ))
      ) : (
        <div className='relative min-h-[50vh] grid place-content-center'>
          <div className=' top-1/2 left-1/2 grid gap-4 justify-items-center'>
            <h2
              className=' text-3xl font-medium text-center'
              style={{
                textWrap: 'balance',
              }}
            >
              No hay nada para ver aqui
            </h2>
            <span>
              <Boton
                onClick={() => router.push('/home')}
                text={'Volver a inicio'}
              />
            </span>
          </div>
        </div>
      )}
      {cart.length ? (
        <div>
          <hr className='mb-4' />
          <p className='text-lg font-medium mb-4'>
            Total: ${cart.reduce((prev, item) => item.precio + prev, 0)}
          </p>
          {/* desabilitar el boton si no esta logueado */}
          <Boton text={'Comprar'}></Boton>
        </div>
      ) : null}
    </div>
  );
}
