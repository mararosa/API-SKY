const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    nome: { type: String, required: true },
    email: {type: String, required: true},
    senha: { type: String, required: true },
    telefone: [
        {
            numero: {type: Number, required: true },
            ddd: {type: Number, required: true}
        }
    ]
  })
  
  const usersModel = mongoose.model('users', UsersSchema);
  
  module.exports = usersModel; 