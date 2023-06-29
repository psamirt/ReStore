'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { Navbar } from '../../components/navbar/navbar';
import CheckoutContent from '../../components/checkoutContent/CheckoutContent';
import store from '@/redux/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/loader/Loader';

export default function page() {
  const { data: session, status } = useSession();
  const sessionRef = useRef();
  const [cookieValue, setCookieValue] = useState(null);
  // const isMountedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setCookieValue(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('User_id'))
        ?.split('=')[1]
    );
    // setIsMounted(true);
  }, []);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    if (
      status !== 'authenticated' &&
      status !== 'loading' &&
      !document.cookie.includes('User_id')
    ) {
      router.push('/home');
    }
  }, [status, cookieValue]);

  return (
    <>
      {session || cookieValue ? (
        <>
          <Navbar />
          <Provider store={store}>
            <CheckoutContent session={session} cookieValue={cookieValue} />
          </Provider>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
