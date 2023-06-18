import React from 'react';
import Card from '../card/card';

function ProductsContainer({ data }) {
  console.log(data);
  return (
    <>
      <div className='grid justify-items-center gap-4 auto-cols-max grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {data.result.map((props) => {
          return (
            <Card
              name={props.name}
              precio={props.precio}
              estado={props.state}
              marca={props.Marca}
              subcategoria={props.subcategoria}
              key={props._id}
              id={props._id}
              image={props.background_image}
              discount={props.Ofertas}
              ubicacion={props.Ubicacion}
            />
          );
        })}
      </div>
    </>
  );
}

export default ProductsContainer;
