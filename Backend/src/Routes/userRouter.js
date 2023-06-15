const express = require("express");
const router = express.Router();
const userController = require("../Controllers/controllersUser");

// Ruta POST para crear un nuevo usuario
router.post("/", userController.createUserController);
router.put("/:id/password", userController.updatePasswordController);
router.get("/:id", userController.getUserHandler);

module.exports = router;
