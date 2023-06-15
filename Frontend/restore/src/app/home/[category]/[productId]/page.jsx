"use client";
import React, { useEffect, useState } from "react";
import datos from "productsExample.json";
import estrellaIco from "../../../iconos/estrellas.png";
import "./detail.css";

function Detail({ props }) {
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const foundProduct = datos.find((p) => p._id);
    setProducto(foundProduct);
  }, []);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="detail-container">
      <div className="container-imagen-estados">
        <img
          className="detail-img"
          src="https://www.efe.com.pe/wcsstore/efe_cat_as/646x1000/HYLED5806A4KM_1.jpg"
          alt="imagen referencial"
        />
        <div className="container-name-price">
          <h2 className="detail-name">
            {producto.name} {producto.Marca} {producto.modelo}
          </h2>
          <h2 className="detail-precio">$1,499</h2>
          <h4 className="detail-secciones">Ubicación: casa</h4>
          <h4 className="detail-secciones">Estado: {producto.estado}</h4>
          <h4 className="detail-secciones">
            Método de envio :
            <select className="detail-select" name="metodo" id="envio">
              <option value="1">opcion 1</option>
              <option value="2">opcion 2</option>
            </select>
          </h4>
          <h4 className="detail-secciones">
            Cantidad :{" "}
            <select className="detail-select" name="cantidad" id="cantidad">
              <option value="1">1 unidad</option>
              <option value="2">2 unidades</option>
              <option value="3">3 unidades</option>
              <option value="4">4 unidades</option>
              <option value="5">5 unidades</option>
              <option value="6">6 unidades</option>
            </select>
          </h4>
          <button className="detail-button-carrito">Añadir al carrito</button>
          <h4 className="detail-secciones">
            Calificación del vendedor : <img src={estrellaIco} alt="" />5
          </h4>
        </div>
      </div>
      <div className="detail-descripcion">
        <div>
          <h4 className="detail-secciones">Descripción:</h4>
          <div className="container-parrafo">
            <p className="detail-descripcion-p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              nam quas molestiae ad minus dolor possimus ea adipisci voluptates
              dicta, magni optio quidem, delectus alias doloremque, fugit
              laborum obcaecati architecto! Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Assumenda, ex ipsam quas doloribus
              fuga voluptatem sed maxime consequatur deleniti saepe
              exercitationem quae, provident debitis nostrum distinctio omnis
              laudantium numquam. Odit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Tempore, ipsam libero! Molestiae doloribus
              voluptatum ipsam quidem magnam fuga velit similique nemo maiores
              ad hic quisquam, neque laudantium vitae ea fugiat!
            </p>
          </div>
        </div>
        <div>
          <h4 className="detail-secciones">También te puede interesar</h4>
          <img
            className="detail-imagen-momentanea"
            src="https://i.stack.imgur.com/t0k67.png"
            alt="imagen referencial"
          />
        </div>
      </div>
    </div>
  );
}

export default Detail;

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import productsData from "../productsData";

// function Detail() {
//   const router = useRouter();
//   const { productId } = router.query;

//   const [producto, setProducto] = useState(null);

//   useEffect(() => {
//     const foundProduct = productsData.find((p) => p._id === productId);
//     setProducto(foundProduct);
//   }, [productId]);

//   if (!producto) {
//     return <div>Producto no encontrado</div>;
//   }

//   return (
//     <div>
//       <div>
//         <Link href={"/home"}>
//           <button className="back-button-detail">Atrás</button>
//         </Link>
//       </div>
//       <div>
//         <h1>{producto.name}</h1>
//         <p>Estado: {producto.estado}</p>
//         <p>Precio: {producto.precio}</p>
//         <p>Descripción: {producto.Description}</p>
//         <p>Marca: {producto.Marca}</p>
//       </div>
//       <div>
//         <h2>Características:</h2>
//       </div>
//     </div>
//   );
// }

// export default Detail;
