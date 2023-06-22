'use client';
import React, { useEffect, useState } from 'react';
import Boton from '../Button/Button';
import { useSelector } from 'react-redux';
import CartItem from '../cartItem/CartItem';

export default function CartContent() {
  const { cart } = useSelector((store) => store);
  console.log(cart);
  useEffect(
    () => {
      //chequear si esta logeado el user, si lo esta poblar el carrito con sus prods
      //se puede hacer una action que reciba muchos prod en el payload y que haga ...state, cart: [...state.cart, ...action.payload]
    },
    [
      /*aca va a ir algo como isLoggedIn*/
    ]
  );

  return (
    <div className='container px-4 m-auto my-8'>
      <h1 className='text-3xl  mb-4 font-semibold text-blue-900'>Carrito</h1>
      {cart.map((item) => (
        <CartItem key={item._id} {...item} />
      ))}
      <hr />
      Total: {/*el total calculado*/}
      <Boton text={'Comprar'}></Boton>
    </div>
  );
}
