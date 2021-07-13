const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const app = express();

app.use(express.json({ extended: true }));

app.use(cors({ origin: true }));

app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

conectarDB();

const port = process.env.port || 4000;

app.listen(port, "0.0.0.0", () => {
  console.log(`server corriendo en el puerto ${port}`);
});
