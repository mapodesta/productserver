const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");

exports.crearTarea = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    let proyecto = await Proyecto.findById(req.body.proyecto);
    if (!proyecto) {
      res.status(404).json({ msg: "No existe ningun proyecto" });
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "Usuario no Autorizado" });
    }

    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    let proyecto = await Proyecto.findById(req.query.proyecto);
    if (!proyecto) {
      res.status(404).json({ msg: "No existe ningun proyecto" });
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "Usuario no Autorizado" });
    }

    const tareas = await Tarea.find({ proyecto });

    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    let proyecto = await Proyecto.findById(req.body.proyecto);
    if (!proyecto) {
      res.status(404).json({ msg: "No existe ningun proyecto" });
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "Usuario no Autorizado" });
    }

    const nuevaTarea = {};
    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    const tarea = await Tarea.findByIdAndUpdate(
      { _id: req.params.id },
      nuevaTarea,
      { new: true }
    );
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    let proyecto = await Proyecto.findById(req.query.proyecto);
    if (!proyecto) {
      res.status(404).json({ msg: "No existe ningun proyecto" });
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "Usuario no Autorizado" });
    }

    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      res.status(404).json({ msg: "No existe ninguna tarea" });
    }

    await Tarea.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Tarea Eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un Error");
  }
};
