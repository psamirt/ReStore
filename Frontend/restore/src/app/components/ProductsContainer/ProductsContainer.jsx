"use client";
import Card from "../card/card";
import style from "./ProductsContainer.module.css";
import React, { useState, useEffect } from "react";

function ProductsContainer({ data, ubicaciones, marcas, estado }) {
  const [filters] = useState({
    estado,
    marcas,
    ubicacion: ubicaciones,
    oferta: ["En oferta"],
    precio: [ "Menos de $200000","Menos de $150000","Menos de $100000","Menos de $50000","Menos de $25000"],
    order: ["Menor precio","Mayor precio","Nombre ascendiente","Nombre descendiente"],
  });
  const [currentFilter, setCurrentFilter] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentFilteredProducts, setCurrentFilteredProducts] = useState(data.result);

  const handleFilterChange = (key, filtro) => {
    setCurrentFilter(filtro);
    setCurrentKey(key);
  };

  const handleOrderChange = (orden) => {
    setCurrentOrder(orden);
  };

  useEffect(() => {
    const filterProducts = () => {
      const filteredProducts = data.result.filter((producto) => {
        if (currentFilter === null) return true;
        if (currentKey === "precio") {
          const precio = parseInt(producto[currentKey].toString().replace(".", ""));
          return precio < parseInt(currentFilter.split("$")[1]);
        }
        return producto[currentKey] === currentFilter;
      });

      setCurrentFilteredProducts(filteredProducts);
    };

    filterProducts();
  }, [currentFilter, currentKey, data.result]);

  useEffect(() => {
    const orderProducts = () => {
      if (currentOrder === "Menor precio")
        setCurrentFilteredProducts((prevProducts) => [...prevProducts].sort((a, b) => a.precio - b.precio));
      if (currentOrder === "Mayor precio")
        setCurrentFilteredProducts((prevProducts) => [...prevProducts].sort((a, b) => b.precio - a.precio));
      if (currentOrder === "Nombre ascendiente")
        setCurrentFilteredProducts((prevProducts) => [...prevProducts].sort((a, b) => a.name.localeCompare(b.name)));
      if (currentOrder === "Nombre descendiente")
        setCurrentFilteredProducts((prevProducts) => [...prevProducts].sort((a, b) => -1 * a.name.localeCompare(b.name)));
    };

    orderProducts();
  }, [currentOrder]);



  return (
    <>
      <button onClick={() => handleFilterChange(null, null)}>
        Mostrar todos
      </button>

      <h4 className={style.h4}>Estado</h4>
      {filters.estado.map((estado) => (
        <button
          className={style.filters}
          key={estado}
          onClick={() => handleFilterChange("state", estado)}
        >
          {estado}
        </button>
      ))}
      <h4 className={style.h4}>Marcas</h4>
      {filters.marcas.map((marca) => (
        <button
          className={style.filters}
          key={marca}
          onClick={() => handleFilterChange("Marca", marca)}
        >
          {marca}
        </button>
      ))}
      <h4 className={style.h4}>Ubicacion</h4>
      {filters.ubicacion.map((ubi) => (
        <button
          className={style.filters}
          key={ubi}
          onClick={() => handleFilterChange("Ubicacion", ubi)}
        >
          {ubi}
        </button>
      ))}

      <h4 className={style.h4}>Precio</h4>
      {filters.precio.map((precio) => (
        <button
          className={style.filters}
          key={precio}
          onClick={() => handleFilterChange("precio", precio)}
        >
          {precio}
        </button>
      ))}

      <h4 className={style.h4}>Ordenar por</h4>
      {filters.order.map((orde) => {
        return (
          <button
            className={style.filters}
            key={orde}
            onClick={() => handleOrderChange(orde)}
          >
            {orde}
          </button>
        );
      })}

      <div className='grid justify-items-center gap-4 auto-cols-max grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {currentFilteredProducts.length ? (
          currentFilteredProducts.map((props) => {
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
          })
        ) : (
          <h2>No se encontraron productos</h2>
        )}
      </div>
    </>
  );
}

export default ProductsContainer;
