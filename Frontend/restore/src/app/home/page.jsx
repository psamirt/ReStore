import React from "react";
import productsExample from "productsExample.json";
import Card from "../components/card/card";
import { AiFillCamera } from "react-icons/ai";
import { GrPersonalComputer } from "react-icons/gr";
import { MdHeadset, MdVideogameAsset } from "react-icons/Md";
import { IoIosTabletPortrait } from "react-icons/Io";
import { ImDisplay } from "react-icons/Im";
import Link from "next/link";
import style from "./page.module.css";
import { Navbar } from "../components/navbar/Navbar";

function Home() {
  const data = productsExample;
  return (
    //Los links en realidad deben ser dinamicos, pero faltan endpoints de categorias
    <>
      <Navbar />
      <div className={style.iconsContainer}>
        <Link className={style.link} href={"/home/categoria"}>
          <MdVideogameAsset fontSize={50} />
        </Link>
        <Link className={style.link} href={"/home/categoria"}>
          <ImDisplay fontSize={50} />
        </Link>
        <Link className={style.link} href={"/home/categoria"}>
          <IoIosTabletPortrait fontSize={50} />
        </Link>
        <Link className={style.link} href={"/home/categoria"}>
          <MdHeadset fontSize={50} />
        </Link>

        <Link className={style.link} href={"/home/categoria"}>
          <GrPersonalComputer fontSize={50}></GrPersonalComputer>
        </Link>
        <Link className={style.link} href={"/home/categoria"}>
          <AiFillCamera fontSize={50}></AiFillCamera>
        </Link>
      </div>
      <h2 className={style.banner}>Ofertas Limitadas!</h2>
      {data.map((props) => {
        return (
          <Card
            name={props.name}
            precio={props.precio}
            estado={props.estado}
            marca={props.Marca}
            subcategoria={props.subcategoria}
            key={props._id}
            id={props._id}
          />
        );
      })}
    </>
  );
}

export default Home;
