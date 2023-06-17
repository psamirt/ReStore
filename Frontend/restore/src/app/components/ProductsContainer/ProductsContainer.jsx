import React from 'react';
import Card from '../card/card';
import style from './ProductsContainer.module.css';


function ProductsContainer({ data }) {
  return (
    <>
      <div className={style.cardsContainer}>
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
