const express = require("express");
const router = express.Router();
const userController = require("../Controllers/controllersUser");

// Ruta POST para crear un nuevo usuario
router.put("/:id/password", userController.updatePasswordController);
router.get("/", userController.getUsersHandler);
router.get("/:id", userController.getUsersHandler);

module.exports = router;
