const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const { check } = require("express-validator");

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "El email debe ser valido").isEmail(),
    check("password", "Debe tener un minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],

  usuariosController.crearUsuario
);

module.exports = router;
