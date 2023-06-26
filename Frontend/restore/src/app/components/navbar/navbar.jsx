'use client';
import Link from 'next/link';
import Searchbar from '../searchbar/searchbar';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
//mostrar fabars como clickeable y desplegar menu con lo otro en modo responsive

export const Navbar = () => {
  // const isUserLoggedin = false;

  const { data: session, status } = useSession();

  return (
    <nav className=' py-4  z-20 sticky top-0 bg-slate-900 text-slate-50'>
      <div className='container  px-4 mx-auto flex gap-4 justify-between items-center'>
        <Link className='link ' href={'/home'}>
          Home
        </Link>
        <div className='flex gap-8 justify-between items-center'>
          {session && (
            <Link
              className='link'
              href={{
                pathname: '/user',
                query: {
                  User: session.user.email,
                },
              }}
            >
              <img
                src={session.user.image}
                style={{ width: '35px', height: '35px' }}
                alt={session.user.name}
              />
            </Link>
          )}

          {!session ? (
            <Link className='link' href={'/login'}>
              Signup/Login
            </Link>
          ) : (
            <button onClick={() => signOut({ callbackUrl: '/home' })}>
              Sign out
            </button>
          )}
          {session && (
            <Link className='link' href={'/form'}>
              Crear producto
            </Link>
          )}
          <Searchbar />

          <Link href={'/cart'}>Carrito</Link>
        </div>
      </div>
    </nav>
  );
};
