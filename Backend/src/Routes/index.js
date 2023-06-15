const express = require("express");
const router = express.Router();
const categoryTechnology = require("./tecnologia");
const userRouter = require("./userRouter");

router.use("/categories/technology", categoryTechnology);
router.use("/users", userRouter);

module.exports = router;
