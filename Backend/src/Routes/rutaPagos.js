const express = require("express");
const router = express.Router();
const { createSession } = require("../Controllers/paymentsControllers");

router.post("/", createSession);
router.get("/success");
router.get("/cancel");
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   webHookController
// );

module.exports = router;
