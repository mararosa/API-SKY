const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connect } = require("../models/dataBase");
const usersModel = require("../models/UsersSchema");

const SECRET = process.env.SECRET;

connect();

function calculateMinutes(dataAtual, dataAntiga) {
  const minutesAtual = dataAtual.getHours() * 60 + dataAtual.getMinutes();
  const minutesAntigo = dataAntiga.getHours() * 60 + dataAntiga.getMinutes();

  const diffMinutes = minutesAtual - minutesAntigo;
  return diffMinutes;
}

const signUp = async (request, response) => {
  const user = await usersModel.find({ email: request.body.email });
  if (user.length >= 1) {
    return response.status(409).json({
      message: "E- mail ja existe"
    });
  }
  const senhaCriptografada = bcrypt.hashSync(request.body.senha);
  request.body.senha = senhaCriptografada;
  const newUser = new usersModel(request.body);
  const token = jwt.sign(
    {}, // payload
    SECRET,
    { expiresIn: 1800 }
  );
  newUser.token = token;
  newUser.save(e => {
    if (e) {
      return response.status(400).json({
        error: e
      });
    }
    return response.status(200).send({ newUser });
  });
};

const signIn = async (request, response) => {
  const user = await usersModel.findOne({ email: request.body.email });
  if (user) {
    const correctPassword = bcrypt.compareSync(request.body.senha, user.senha);
    if (correctPassword) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id
        }, // payload
        SECRET,
        { expiresIn: 1800 }
      );
      user.data_login = new Date();
      user.token = token;
      user.save();
      return response.status(200).send({ user });
    }
    return response.status(401).json({
      message: "Usuario e/ou senha invalidos"
    });
  }
  return response.status(401).json({
    message: "Usuario e/ou senha invalidos"
  });
};

const searchUser = (request, response) => {
  const id = request.params.userId;
  usersModel.findById(id, (error, user) => {
    if (user) {
      const dataAtual = new Date();
      const dataAntiga = user.data_login;
      const minutes = calculateMinutes(dataAtual, dataAntiga);
      if (minutes > 30) {
        return response.status(400).json({
          message: "Sessão inválida"
        });
      }
      return response.status(200).send({ user });
    }
    return response.status(401).json({
      err: error
    });
  });
};

const getAll = (request, response) => {
  usersModel.find((error, users) => {
    if (error) {
      return response.status(500).send(error);
    }
    return response.status(200).send(users);
  });
};

const remove = (request, response) => {
  const id = request.params.userId;
  usersModel.findByIdAndDelete(id, (error, user) => {
    if (user) {
      return response.status(200).json({
        message: "Usuário deletado"
      });
    }
    return response.status(500).json({
      err: error
    });
  });
};

module.exports = {
  signUp,
  signIn,
  searchUser,
  getAll,
  remove
};
