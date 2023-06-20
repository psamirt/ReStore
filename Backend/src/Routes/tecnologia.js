const express = require("express");
const router = express.Router();
const {postProduct,getAllProducts,getAllProductsByCategory} = require("../Controllers/controllersTecnologias")
const {disabledProduct,getDisabledProducts} = require("../Controllers/disableProduct")
const {ofertProduct,getOfertProducts} = require ("../Controllers/ofertas")
const detailProduct = require("../Controllers/detail")
const Search = require("../Controllers/searchName")

const {getAccesorios,getComputacion,getElectronica,getConsolas,getCelulares} = require("../Controllers/subCategorias")

//----------getAllProducts---------------------------------------------------------------------------------------------------------------//
router.get("/allProducts",getAllProducts)
//----------PostProducts---------------------------------------------------------------------------------------------------------------//
router.post("/posteo",postProduct)

//----------Disabled---------------------------------------------------------------------------------------------------------------//
router.put("/disabled",disabledProduct)
router.get("/disabled",getDisabledProducts)

//----------getSubCategories---------------------------------------------------------------------------------------------------------------//
router.get("/categoria/:category", getAllProductsByCategory)

//----------Ofertas---------------------------------------------------------------------------------------------------------------//
router.get("/Ofertas",getOfertProducts)
router.put("/Ofertas",ofertProduct)
//-----------Detail-------------------------------------------------------------------------------------------------------------//
router.get("/Detail/:id",detailProduct)
//-----------SearchByName-------------------------------------------------------------------------------------------------------------//
router.get("/searchName",Search)

// subcatgoria

router.get("/Computacion/:compu", getComputacion);
router.get("/ElectronicaAudioVideo/:electro", getElectronica);
router.get("/ConsolasyVideojuegos/:conso", getConsolas);
router.get("/Celulares/:celu", getCelulares);
router.get("/CamarasyAccesorios/:cam", getAccesorios);


module.exports=router