'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { Navbar } from '../../components/navbar/navbar';
import CheckoutContent from '../../components/checkoutContent/CheckoutContent';
import store from '@/redux/store';
import { PrivateRoute } from '../../components/privateRoute/PrivateRoute';
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
  console.log(status, 'status............................');

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
    console.log(status !== 'authenticated' && status !== 'loading');
    if (
      status !== 'authenticated' &&
      status !== 'loading' &&
      !document.cookie.includes('User_id')
    ) {
      console.log(status);
      router.push('/home');
    }
  }, [status, cookieValue]);

  return (
    <>
      {session || cookieValue ? (
        <>
          {/* <PrivateRoute manualLogIn={cookieValue} thirdLogIn={session}> */}
          <Navbar />
          <Provider store={store}>
            <CheckoutContent session={session} cookieValue={cookieValue} />
          </Provider>
          {/* </PrivateRoute> */}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
