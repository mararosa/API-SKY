const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/ApiSky";

// const DB_URL = process.env.MONGODB_URI

// process.env.PORT

const connect = () => {
  mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  });
  const connection = mongoose.connection;
  connection.on("error", () => console.error("Erro ao conectar"));

  connection.once("open", () => console.log("Conectado no MongoDB"));
};

module.exports = { connect };
