const express = require("express");
const router = express.Router();
const {postProduct,getAllCamarasyAccesorios,getAllCelulares,getAllComputacion,getAllConsolasyVideojuegos,getAllElectronicaAudioVideo,getAllTV} = require("../Controllers/controllersTecnologias")


router.post("/posteo",postProduct)
router.get("/TV",getAllTV)
router.get("/Computacion",getAllComputacion)
router.get("/ElectronicaAudioVideo",getAllElectronicaAudioVideo)
router.get("/ConsolasyVideojuegos",getAllConsolasyVideojuegos)
router.get("/Celulares",getAllCelulares)
router.get("/CamarasyAccesorios",getAllCamarasyAccesorios)




module.exports=router