import React from "react";
import { fetchCategories } from "./fetch";
import ProductsContainer from "../components/ProductsContainer/ProductsContainer";
import { Navbar } from "../components/navbar/navbar";
import Carousel from "../components/carousel/Carousel";
import { AiFillCamera } from "react-icons/ai";
import { GrPersonalComputer } from "react-icons/gr";
import { MdHeadset, MdVideogameAsset } from "react-icons/Md";
import { IoIosTabletPortrait } from "react-icons/Io";
import { ImDisplay } from "react-icons/Im";
import style from "./page.module.css";
import Link from "next/link";

async function Home() {

  const data = await fetchCategories();
  

  return (
    <div>
      <Navbar
       />
      <Carousel />

      <div className={style.iconsContainer}>
        <Link className={style.link} href={"/home/ConsolasyVideojuegos"}>
          <MdVideogameAsset fontSize={50} />
        </Link>
        <Link className={style.link} href={"/home/TV"}>
          <ImDisplay fontSize={50} />
        </Link>
        <Link className={style.link} href={"/home/Celulares"}>
          <IoIosTabletPortrait fontSize={50} />
        </Link>
        <Link className={style.link} href={"/home/ElectronicaAudioVideo"}>
          <MdHeadset fontSize={50} />
        </Link>
        <Link className={style.link} href={"/home/Computacion"}>
          <GrPersonalComputer fontSize={50}></GrPersonalComputer>
        </Link>{" "}
        <Link className={style.link} href={"/home/CamarasyAccesorios"}>
          <AiFillCamera fontSize={50}></AiFillCamera>
        </Link>
      </div>
      <h2> Ofertas Limitas!</h2>
        <ProductsContainer data={data}/>

    </div>
  );
}

export default Home;
