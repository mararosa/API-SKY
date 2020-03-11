const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    nome: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    senha: { type: String, required: true, unique: true },
    telefone: [
        {
            numero: {type: Number, required: true },
            ddd: {type: Number, required: true}
        }
    ],
    dataCadastro: { type: Date, default: Date.now},
    dataAtualizacao: { type: Date, default: Date.now},
    dataLogin: { type: Date, default: Date.now},
  })
  
  const usersModel = mongoose.model('users', UsersSchema);
  
  module.exports = usersModel; 