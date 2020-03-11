const { connect } = require('../models/dataBase')
const usersModel = require('../models/UsersSchema')
const bcrypt = require('bcryptjs')

connect()

const signUp = (request, response) => {
    if (!request.body.senha) {
        return response.status(400).send('Digite a senha')
    }
    const senhaCriptografada = bcrypt.hashSync(request.body.senha)
    request.body.senha = senhaCriptografada
    const newUser = new usersModel(request.body)
    newUser.save((error) => {
        if (error) {
            return response.status(500).send(error)
        }
        return response.status(201).send(newUser)
    })
}

module.exports = {
signUp,
}