const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").notEmpty()],
  proyectoController.crearProyecto
);

router.get("/", auth, proyectoController.obtenerProyectos);

router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").notEmpty()],
  proyectoController.actualizarProyecto
);

router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
