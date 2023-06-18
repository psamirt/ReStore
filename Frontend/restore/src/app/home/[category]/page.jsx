import { fetchCategory } from "../fetch";
import Card from "@/app/components/card/card";
import { Navbar } from "@/app/components/navbar/navbar";
import style from "./page.module.css";
import ProductsContainer from "@/app/components/ProductsContainer/ProductsContainer";

async function page({ params }) {
  const categoria = params.category;
  const data = await fetchCategory(categoria);
  const ubicaciones = [...new Set(data.result.map(producto => producto.Ubicacion))];
  const marcas = [...new Set(data.result.map(producto => producto.Marca))];
  const estado = [...new Set(data.result.map(producto => producto.state))];
  return (
    <>
      <Navbar />
      <h2 className={style.categoria}>{categoria}</h2>
      <div>
      <ProductsContainer data={data} ubicaciones={ubicaciones} marcas={marcas} estado={estado} />
      </div>
    </>
  );
}

export default page;
