const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

router.post(
  "/",
  auth,
  [check("nombre", "el nombre de la tarea es obligatorio").not().isEmpty()],
  [check("proyecto", "el nombre del proyecto es obligatorio").not().isEmpty()],
  tareaController.crearTarea
);

router.get(
  "/",
  auth,
  [check("proyecto", "el nombre del proyecto es obligatorio").not().isEmpty()],
  tareaController.obtenerTareas
);

router.put("/:id", auth, tareaController.actualizarTarea);

router.delete("/:id", auth, tareaController.eliminarTarea);

module.exports = router;
