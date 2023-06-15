import React from "react";
import "./Card.css";
import Link from "next/link";
import Boton from "../Button/Button";

function Card(data) {
  return (
    <div className="Card">
      <h3>{data.name}</h3>
      <div className="text">
        <p>Estado:{data.estado} </p>
        <p>Marca:{data.marca}</p>
        <p>Categoria:{data.subcategorias}</p>
        <p>Price:${data.precio}</p>
      </div>
        <Link href={`/home/category/${data.id}`}>
       <Boton className="boton" text="show detail">
        </Boton> 
        </Link>
    </div>
  );
}

export default Card;
