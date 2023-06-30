'use client';
import Link from 'next/link';
import Searchbar from '../searchbar/searchbar';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import axios from 'axios';
import { fetchData } from 'next-auth/client/_utils';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({});
  const [cookieValue, setCookieValue] = useState(null);
  useEffect(() => {
    setCookieValue(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('User_id'))
        ?.split('=')[1]
    );
  }, []);
  const [cookieAdmin, setCookieAdmin] = useState(null);
  useEffect(() => {
    setCookieAdmin(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('Admin'))
        ?.split('=')[1]
    );
  }, []);

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  useEffect(() => {
    const fetchData = async () => {
      // Verifica si hay sesión y si existe la cookie 'User_id'
      if (session || cookieValue) {
        setFlag(true);
      }
      if (cookieValue) {
        try {
          const response = await axios.get(
            `https://re-store.onrender.com/users/${cookieValue}`
          );
          const { data } = response;
          setUser(data);
        } catch (error) {
          // Manejar el error de la petición
        }
      }
    };

    fetchData();
  }, [session, flag, fetchData, cookieValue]);

  const handleLogOut = () => {
    if (cookieValue) {
      deleteCookie('User_id'); // Utiliza la función deleteCookie para borrar la cookie
      setFlag(false);
      setCookieValue(null);
    }
    if (cookieAdmin) {
      deleteCookie('Admin'); // Utiliza la función deleteCookie para borrar la cookie
      setFlag(false);
      setCookieAdmin(null);
    } else {
      signOut();
      setFlag(false);
    }
    router.push('/home');
  };

  return (
    <nav className='py-4 z-20 sticky top-0 bg-slate-900 text-slate-50'>
      <div className='container px-4 mx-auto flex gap-4 justify-between'>
        <Link className='self-center link' href={'/home'}>
          Pagina Principal
        </Link>
        <div className='flex gap-8 justify-between items-center'>
          {session ? (
            <Link
              className='link'
              href={{
                pathname: '/user',
                query: {
                  User: session.user.email,
                },
              }}
            >
              <Image
                src={session.user.image}
                width='35'
                height='35'
                alt={session.user.name}
                className='rounded-full'
              />
            </Link>
          ) : null}

          {cookieValue ? (
            <Link
              className='link'
              href={{
                pathname: '/user',
                query: {
                  User: user.email,
                },
              }}
            >
              <Image
                src={user.imagenDePerfil}
                width='35'
                height='35'
                alt={user.nombre}
                className='rounded-full'
              />
            </Link>
          ) : null}

          {!flag ? (
            <Link className='link' href={'/login'}>
              Iniciar sesion
            </Link>
          ) : (
            <button onClick={handleLogOut}>Cerrar sesion</button>
          )}
          {flag ? (
            <Link className='link' href={'/form'}>
              Crear producto
            </Link>
          ) : null}
          {cookieAdmin ? (
            <Link className='link' href={'/dashboardadmin'}>
              Dashboard Admin
            </Link>
          ) : null}
          <Searchbar />
          <Link href={'/cart'}>Carrito</Link>
        </div>
      </div>
    </nav>
  );
};
