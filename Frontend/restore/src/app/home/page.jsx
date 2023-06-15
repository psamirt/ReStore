
import React from 'react'
import { fetchCategories } from './fetch'
import ProductsContainer from '../components/ProductsContainer/ProductsContainer'
import { Navbar } from '../components/navbar/navbar';
import Carousel from "../components/carousel/Carousel";
import { AiFillCamera } from "react-icons/ai";
import { GrPersonalComputer } from "react-icons/gr";
import { MdHeadset, MdVideogameAsset } from "react-icons/Md";
import { IoIosTabletPortrait } from "react-icons/Io";
import { ImDisplay } from "react-icons/Im";
import style from "./page.module.css";
import Link from 'next/link';



async function Home() {
  const data = await fetchCategories("Computacion")

  return (
    <div>

 <Navbar />
 <Carousel/>
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
   </Link>/   <Link className={style.link} href={"/home/categoria"}>
     <AiFillCamera fontSize={50}></AiFillCamera>
   </Link>
 </div>
 <ProductsContainer   data={data} />
    </div>
      ) 

}

export default Home





