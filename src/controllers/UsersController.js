const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connect } = require("../models/dataBase");
const usersModel = require("../models/UsersSchema");

const SECRET = process.env.SECRET;

connect();

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
  newUser.save(e => {
    if (e) {
      return response.status(400).json({
        error: e
      });
    }
    return response.status(200).send({ newUser, token });
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
      return response.status(200).send({ user, token });
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
      return response.status(200).send({ user });
    }
    return response.status(401).json({
      err: error
    });
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
  remove
};
