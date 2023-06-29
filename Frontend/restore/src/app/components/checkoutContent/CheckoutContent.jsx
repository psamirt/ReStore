import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Boton from '../Button/Button';
import axios from 'axios';
import { totalPrice } from '@/app/helpers/totalPrice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cleanCart } from '@/redux/actions';

export default function CheckoutContent({ session, cookieValue }) {
  const { cart } = useSelector((store) => store);
  const [locations, setLocations] = useState([]);
  const [products, setProducts] = useState([]);
  const [processingPayment, setProcessingPayment] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const total = totalPrice(cart);
  const shipment = 1500;

  useEffect(() => {
    if (!cart.length) {
      router.push('/home');
    } else {
      const fetch = async () => {
        Promise.all(
          cart.map((item) =>
            axios.get(
              `https://re-store.onrender.com/categories/technology/Detail/${item.productId}`
            )
          )
        )
          .then((values) =>
            setProducts(
              values.map((value) => {
                //se puede tambien sacar quantity cuando se incorpore
                const {
                  Marca: description,
                  name,
                  background_image,
                  precio,
                  Ofertas,
                } = value.data.result[0];
                console.log();
                const finalPrice = Ofertas
                  ? Math.round(
                      Number(totalPrice([{ precio, oferta: Ofertas }])) * 100
                    )
                  : Number(precio) * 100;
                return {
                  name,
                  description,
                  unit_amount: Number(finalPrice),
                  quantity: 1,
                  images: [background_image],
                };
              })
            )
          )
          .catch((error) => console.log(error));
      };
      fetch();
    }
  }, [cart]);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (session) {
          const { data } = await axios(
            `https://re-store.onrender.com/users/ubication/${session.user.id}`
          );
          setLocations(data);
        } else if (cookieValue) {
          const { data } = await axios(
            `https://re-store.onrender.com/users/ubication/${cookieValue}`
          );
          setLocations(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handlePayment = async () => {
    setProcessingPayment(true);
    const userId = session?.user.id || cookieValue;
    console.log(userId);
    try {
      const { data } = await axios.post(
        'https://re-store.onrender.com/payments/create-checkout-session',
        // 'http://localhost:3001/payments/create-checkout-session',
        // 'https://deploy-funcionando.onrender.com/payments/create-checkout-session',
        {
          userId,
          cartItems: products,
        }
      );
      setProcessingPayment(false);
      dispatch(cleanCart(session?.user.id, cookieValue));
      router.push(data.url);
    } catch (error) {
      console.log(error, '..............erorr..............');
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 flex gap-8 justify-between min-h-screen'>
      <div>
        {/* <button onClick={handlePrueba}>AAAAAAAAAAAAAAA</button> */}
        <h1>¿Cómo querés recibir o retirar tu compra?</h1>
        <h2>Domicilio</h2>
        {/* traer Direcciones del user con user id, mostrarlas y dar la opcion
        de elegir otra, y si no hay, decirle que debe agregar una ubicacion y redirigirlo
        o mostrarle el componente
     */}
        <h2>Recibir paquetes</h2>
        {/* card que diga llegan en tal fecha a x domicilio, y si es gratis o cuanto
     cuesta el envio */}
        <h2>Retirar paquetes</h2>
        {/* misma card pero que diga retirar en el local x direccion */}
        <Boton onClick={handlePayment} text={'Pagar'}></Boton>
        {processingPayment ? (
          <div class='flex items-center'>
            <div role='status'>
              <svg
                aria-hidden='true'
                class='w-10 h-10 mr-4 text-gray-200 animate-spin fill-green-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span class='sr-only'>Loading...</span>
            </div>
            Procesando el pago
          </div>
        ) : null}
      </div>
      <aside className='bg-slate-200 '>
        {/* si es solo un prod mostrar img en redondo y titulo + precio */}
        {/* si no: */}
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
            <hr />
            <div>
              <span>Pagás</span>
              <span>{`$${(Number(total) + shipment).toFixed(2)}`}</span>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
