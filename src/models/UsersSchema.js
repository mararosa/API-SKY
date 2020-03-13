const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    nome: { type: String, required: true },
    email: {type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    senha: { type: String, required: true},
    telefone: [
        {
            numero: {type: Number, required: true },
            ddd: {type: Number, required: true}
        }
    ],
    data_criacao: { type: Date, default: Date.now},
    data_atualizacao: { type: Date, default: Date.now},
    data_login: { type: Date, default: Date.now},
  });
  
  const usersModel = mongoose.model('users', UsersSchema);
  
  module.exports = usersModel; 