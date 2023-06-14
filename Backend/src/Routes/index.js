const express = require("express");
const router = express.Router();
const categoryTechnology = require("./tecnologia")


router.use("/categories/technology",categoryTechnology)



module.exports=router