const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("conectado con exito !");
  } catch (error) {
    console.log(error), process.exit(1);
  }
};

module.exports = conectarDB;
