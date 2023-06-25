"use client";
import React from "react";
import "./detail.css";
import { fetchDetail } from "../../fetch";
import Image from "next/image";
import Boton from "@/app/components/Button/Button";
import BackButton from "@/app/components/backButton/BackButton";
import NotFound from "./notFound";
import { addToCart } from "@/redux/actions";
import { useDispatch } from "react-redux";

export async function DetailId({ param }) {
  const dispatch = useDispatch();
  const post = await fetchDetail(param);
  if (post.message) return <NotFound />;

  const calculateDiscountedPrice = () => {
    if (post.result[0].Ofertas && post.result[0].precio) {
      const descuento = parseFloat(post.result[0].Ofertas) / 100;
      const precio = parseFloat(post.result[0].precio);
      const precioConDescuento = precio - precio * descuento;
      return precioConDescuento.toFixed(2);
    }
    return null;
  };

  const precioConDescuento = calculateDiscountedPrice();

  return (
    <div className="container mx-auto px-4 my-8" key={post.result[0]._id}>
      <BackButton />
      <div className="grid md:grid-cols-2 gap-4 mb-8 mt-4">
        <div className="relative rounded-lg aspect-square shadow-md shadow-slate-200 md:justify-self-center ">
          <Image
            className="aspect-square rounded-lg object-contain"
            src={post.result[0].background_image}
            alt={post.result[0].name}
            fill
          />
        </div>
        <div className="grid gap-4 text-gray-600">
          <h2 className="text-xl font-semibold text-blue-900">
            {post.result[0].name} {post.result[0].Marca}
          </h2>
          <p className="">Ubicacion : {post.result[0].Ubicacion}</p>
          <p className="">Estado: {post.result[0].state}</p>
          <h3 className="">
            Calificación del vendedor : <img src="" alt="" />5
          </h3>
          {precioConDescuento ? (
            <p className='font-medium text-base text-slate-500'>
              Precio:{" "}
              <span className='text-red-400 line-through'>
                ${post.result[0].precio}
              </span>{" "}
              <span className='text-slate-800'>${precioConDescuento}</span>
            </p>
          ) : (
            <p className='font-medium text-base text-slate-800'>
              Precio: ${post.result[0].precio}
            </p>
          )}
          <div>
            <label className="block mb-2">Método de envio :</label>
            <select
              className="cursor-pointer py-1 px-2 rounded-lg bg-slate-300    text-slate-800 font-medium"
              name="metodo"
              id="envio"
            >
              <option value="1">Opción 1</option>
              <option value="2">Opción 2</option>
            </select>
          </div>
          <div>
            <Boton
              onClick={() => dispatch(addToCart(post.result[0]))}
              text={"Añadir al carrito"}
            >
              Añadir al carrito
            </Boton>
          </div>
        </div>
      </div>
      <div className="grid  gap-4 mb-8">
        <div className="grid gap-2">
          <h3 className="text-blue-900 text-xl font-medium">Descripción: </h3>
          <p className="text-gray-600 leading-normal text-sm">
            {post.result[0].Description}
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-xl font-semibold text-blue-900">
            También te puede interesar:
          </h3>
          <img
            className=""
            src="https://i.stack.imgur.com/t0k67.png"
            alt="imagen referencial"
          />
        </div>
      </div>
    </div>
  );
}
