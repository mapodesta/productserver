const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Proyecto = require("../models/Proyecto");

exports.crearProyecto = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    let proyecto = await new Proyecto(req.body);
    proyecto.creador = req.usuario.id;
    await proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

exports.actualizarProyecto = async (req, res) => {
  const errores = validationResult(req);
  const nuevoProyecto = {};
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { nombre } = req.body;

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }
  try {
    let proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "Usuario no Autorizado" });
    }

    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    return res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al actualizar");
  }
};

exports.eliminarProyecto = async (req, res) => {
  try {
    let proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "Usuario no Autorizado" });
    }

    await Proyecto.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "Proyecto Eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al intentar Eliminar");
  }
};
