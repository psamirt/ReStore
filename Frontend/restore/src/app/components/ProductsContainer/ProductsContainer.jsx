import React from 'react';
import productsExample from 'productsExample.json';
import Card from '../card/card';
import { AiFillCamera } from 'react-icons/ai';
import { GrPersonalComputer } from 'react-icons/gr';
import { MdHeadset, MdVideogameAsset } from 'react-icons/Md';
import { IoIosTabletPortrait } from 'react-icons/Io';
import { ImDisplay } from 'react-icons/Im';
import Link from 'next/link';
import style from './ProductsContainer.module.css';
import Carousel from '../carousel/Carousel';

function ProductsContainer({ data }) {
  console.log(data);
  return (
    //Los links en realidad deben ser dinamicos, pero faltan endpoints de categorias
    <>
      <h2 className={style.banner}>Ofertas Limitadas!</h2>
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
