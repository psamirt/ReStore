const express = require("express");
const router = express.Router();
const {postProduct} = require("../Controllers/controllersTecnologias")

// router.get("/productos/all",)
// router.get("/productos/id/:id",)
// router.get("/productos/subcategorias",) // Se busca la subcategoria por query

router.post("/posteo",postProduct)
//rutas delete y put mas adelante


module.exports=router