import { fetchCategory } from "../fetch";
import Card from "@/app/components/card/card";
import { Navbar } from "@/app/components/navbar/navbar";
import style from "./page.module.css";
import ProductsContainer from "@/app/components/ProductsContainer/ProductsContainer";

async function page({ params }) {
  const categoria = params.category;
  const response = await fetchCategory(categoria);
  return (
    <>
      <Navbar />
      <h2 className={style.categoria}>{categoria}</h2>
      <div className={style.cardsContainer}>
        <ProductsContainer data={response} ></ProductsContainer>
      </div>
    </>
  );
}

export default page;
