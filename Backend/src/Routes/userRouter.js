const express = require("express");
const router = express.Router();
const userController = require("../Controllers/controllersUser");
const {postVerifyUser,getVerifyUser} = require ("../Controllers/verification")


// Ruta POST para crear un nuevo usuario
router.post("/", userController.createUserController);
router.put("/changePassword", userController.updatePasswordController);
router.get("/", userController.getUsersHandler);
router.get("/:id", userController.getUsersHandler);
router.get("/:email/email", userController.getEMAIL);
//--------------Verificaciones----------------------------------------------------------------//
router.post("/verify_email",postVerifyUser)
router.get("/verify_emaill/:uuid",getVerifyUser)

module.exports = router;
