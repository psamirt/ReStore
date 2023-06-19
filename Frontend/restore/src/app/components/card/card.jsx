import React from "react";
import "./Card.css";
import Link from "next/link";
import Boton from "../Button/Button";
import Image from "next/image";

//Hacer un botton para el carrito, o una imagen que al apretar => un evento OnClick que pase a la ruta post "localhost/carrito/add" por body el id del producto 
// !!IMPORTANTE agregar esto a axios para que envie la cookie { withCredentials: true }

function Card(data) {
  return (
    <div className="Card">
      <h3>{data.name}</h3>
      <div style={{width: '50%', height: '50%', position: 'relative'}}>
      <Image  src={data.image} alt={data.name}  fill
    objectFit='contain'/>
      </div>
      <div className="text">
        <p>Estado:{data.estado} </p>
        <p>Marca:{data.marca}</p>
        <p>Categoria:{data.subcategorias}</p>
        <p>Precio:${data.precio}</p>

      </div>
        <Link href={`/home/category/${data.id}`}>
       <Boton className="boton" text="show detail">
        </Boton> 
        </Link>
    </div>
  );
}


export default Card;
