'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export const PrivateRoute = ({ children, thirdLogIn, manualLogIn }) => {
  const router = useRouter();
  return thirdLogIn || manualLogIn ? children : router.push('/home');
};
