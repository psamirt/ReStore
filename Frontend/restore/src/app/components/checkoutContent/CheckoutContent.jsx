import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Boton from '../Button/Button';
import axios from 'axios';
import { totalPrice } from '@/app/helpers/totalPrice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cleanCart } from '@/redux/actions';
import LocationsCards from '../locationsCards/LocationsCards';
import SelectShipment from '../selectShipment/SelectShipment';
import fetchCartProductsById from '@/app/helpers/fetchCartProductsById';
import ProcessingPayment from '../processingPayment/ProcessingPayment';

export default function CheckoutContent({ session, cookieValue }) {
  const { cart } = useSelector((store) => store);

  const [products, setProducts] = useState([]);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setpaymentError] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const total = totalPrice(cart);

  useEffect(() => {
    if (!cart.length) {
      router.push('/home');
    } else {
      fetchCartProductsById(cart, setProducts);
    }
  }, [cart]);

  const handlePayment = async () => {
    setProcessingPayment(true);
    setpaymentError(false);
    const envio = selectedMethod === 'enviar';
    const direccion = selectedLocation?.ciudad
      ? {
          ciudad: selectedLocation.ciudad,
          codigoPostal: selectedLocation.codigoPostal,
          calle: selectedLocation.direccion,
        }
      : null;
    try {
      const userId = session?.user.id || cookieValue;
      const { data } = await axios.post(
        'https://re-store.onrender.com/payments/create-checkout-session',
        {
          userId,
          cartItems: products,
        }
      );
      setProcessingPayment(false);
      localStorage.setItem('envio', JSON.stringify(envio));
      localStorage.setItem('direccion', JSON.stringify(direccion));

      // TODO pasar el dispatch a la pantalla de success
      dispatch(cleanCart(session?.user.id, cookieValue));
      router.push(data.url);
    } catch (error) {
      setProcessingPayment(false);
      setpaymentError(true);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 flex gap-8 justify-between'>
      <div className='grid gap-8'>
        <h1 className='text-3xl font-semibold'>
          ¿Cómo querés recibir o retirar tu compra?
        </h1>
        <div>
          <h2>Domicilio</h2>
          <LocationsCards
            userId={session.user.id}
            cookieValue={cookieValue}
            setSelectedLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
            selectedMethod={selectedMethod}
          ></LocationsCards>
        </div>
        <SelectShipment
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
          setSelectedLocation={setSelectedLocation}
        />
        <Boton
          disabled={
            (!selectedLocation && selectedMethod !== 'no enviar') ||
            selectedMethod === null
          }
          onClick={handlePayment}
          text={'Pagar'}
        />
        {processingPayment ? <ProcessingPayment /> : null}
        {paymentError ? (
          <p>Ocurrio un error en el pago, vuelve a intentarlo</p>
        ) : null}
      </div>
      <aside className='bg-slate-200 '>
        {cart && cart.length > 1 ? (
          <div>
            <h2>Resumen de compra</h2>
            <hr />
            <p>{`Productos ${cart.length}`}</p>
            <p>{`Total: $${total}`}</p>
          </div>
        ) : null}
        {cart && cart.length === 1 ? (
          <div>
            {products[0] ? (
              <Image
                width={120}
                height={120}
                src={products[0].images[0]}
                alt={products[0].name}
              ></Image>
            ) : (
              <div style={{ width: '120px', height: '120px' }} />
            )}

            <h3>{products[0]?.name}</h3>
            <hr />
            <div>
              <span>Producto</span>
              <span>{`$${total}`}</span>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
