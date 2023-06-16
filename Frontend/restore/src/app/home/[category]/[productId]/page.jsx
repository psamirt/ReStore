import {DetailId} from "./FetchDetail.jsx"

async function Detail() {

  return (
<section>
  <DetailId/>
</section>
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
