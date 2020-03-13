const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dataBase = require("./models/dataBase");

dataBase.connect();
const users = require("./routes/users");

// rota index

const index = require("./routes/index");

app.use(cors());
app.use(bodyParser.json());
app.use("/", index);
app.use("/users", users);

module.exports = app;
