import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Boton from '../Button/Button';
import axios from 'axios';

export default function CheckoutContent({ session }) {
  const { cart } = useSelector((store) => store);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(
        `https://re-store.onrender.com/users/ubication/${session.user.id}`
      );
      if (data.error) return;
      setLocations(data);
    };
    fetch();
  }, []);

  const cantidadDeProds = 0;
  return (
    <div>
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
      <Boton text={'Pagar'}></Boton>
      <aside>
        <h2>Resumen de compra</h2>
        <hr />
        {/* si es solo un prod mostrar img en redondo y titulo + precio */}
        {/* si no: */}
        <div>
          <p>{`Productos ${cantidadDeProds}`}</p>
          <p>{'acaeltotaldelprecio'}</p>
        </div>
      </aside>
    </div>
  );
}
