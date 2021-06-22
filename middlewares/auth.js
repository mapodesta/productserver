const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Error en el token" });
  }

  try {
    const cifrado = jwt.verify(token, process.env.SECRET);
    (req.usuario = cifrado.usuario), next();
  } catch (error) {
    return res.status(401).json({ msg: "Error,Token no Valido" });
  }
};
