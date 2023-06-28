'use client';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Navbar } from '../../components/navbar/navbar';
import CheckoutContent from '../../components/checkoutContent/CheckoutContent';
import store from '@/redux/store';
import { PrivateRoute } from '../../components/privateRoute/PrivateRoute';
import { useSession } from 'next-auth/react';

export default function page() {
  const { data: session, status } = useSession();
  const [cookieValue, setCookieValue] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setCookieValue(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('User_id'))
        ?.split('=')[1]
    );
    setIsMounted(true);
  }, []);
  return (
    <>
      {isMounted ? (
        <>
          <PrivateRoute manualLogIn={cookieValue} thirdLogIn={session}>
            <Navbar />
            <Provider store={store}>
              <CheckoutContent session={session} />
            </Provider>
          </PrivateRoute>
        </>
      ) : (
        <div>montando</div>
      )}
    </>
  );
}
