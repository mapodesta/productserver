const express = require("express");
const conectarDB = require("./config/db");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/usuarios", require("./routes/usuarios"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

conectarDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server corriendo en el puerto ${PORT}`);
});
