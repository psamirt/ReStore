import { cleanCart } from '@/redux/actions';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProcessingPayment from '../processingPayment/ProcessingPayment';
import Boton from '../Button/Button';
import Link from 'next/link';

export default function OrderContent({ success }) {
  const [wait, setWait] = useState(true);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage?.getItem('userId'));
  const direccion = JSON.parse(localStorage?.getItem('direccion'));
  const envio = JSON.parse(localStorage?.getItem('envio'));

  useEffect(() => {
    if (success === 'true') {
      setWait(true);

      const fetchMail = async () => {
        try {
          const { data } = await axios(
            `https://re-store.onrender.com/users/${userId}`
          );
          setEmail(data.email);
        } catch (error) {
          console.log(error);
        }
      };
      fetchMail();
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.post(
          `https://re-store.onrender.com/payments/send-email`,
          { direccion, mail: email, envio }
        );
        setWait(false);
        dispatch(cleanCart(userId, null));
        localStorage.removeItem('userId');
        localStorage.removeItem('direccion');
        localStorage.removeItem('envio');
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [email]);

  return (
    <div className='h-[90vh] grid place-content-center'>
      {success === 'true' ? (
        wait ? (
          <ProcessingPayment
            text={'Por favor espere mientras confirmamos su compra'}
          />
        ) : (
          <div className='grid gap-4 text-center'>
            <h1 className='text-3xl font-semibold text-blue-900'>
              ¡Gracias por su compra!
            </h1>
            <p className='text-xl'>{`Recibira un mail con la informacion ${
              envio ? 'del envío' : 'para retirar su producto'
            }`}</p>
            <Link href={'/home'}>
              <Boton text={'Volver al inicio'}></Boton>
            </Link>
          </div>
        )
      ) : (
        <div className='grid gap-4 text-center'>
          <h1 className='text-3xl font-semibold text-blue-900'>
            Lo sentimos, algo salió mal
          </h1>
          <p className='text-xl'>{`El pago no se procesó correctamente`}</p>
          <div className='grid grid-cols-2 gap-4 '>
            <Link className='grid' href={'/home'}>
              <Boton text={'Volver al inicio'}></Boton>
            </Link>
            <Link className='grid' href={'/cart/checkout'}>
              <Boton text={'Reintentar'}></Boton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
