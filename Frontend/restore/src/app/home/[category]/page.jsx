import React from "react";
import { fetchCategory } from "../fetch";
import Card from "@/app/components/card/card";
import { Navbar } from "@/app/components/navbar/navbar";
import style from "./page.module.css"
import Order from "@/app/components/order/order";

async function page({ params }) {
  const categoria = params.category;
  const response = await fetchCategory(categoria);
  return (
    <>
      <Navbar />
      <h2 className={style.categoria}>{categoria}</h2>
      <div className={style.cardsContainer}>
      <Order/>
      {response.result.map((result) => {
        return (
          <Card
            key={result._id}
            name={result.name}
            precio={result.precio}
            estado={result.state}
            marca={result.Marca}
            image={result.background_image}
            id={result._id}
          />
        );
      })}
      </div>
    </>
  );
}

export default page;
