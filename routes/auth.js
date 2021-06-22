const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");

router.post(
  "/",
  [
    check("email", "El email debe ser valido").isEmail(),
    check("password", "Debe tener un minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  authController.authUsuarios
);

module.exports = router;
