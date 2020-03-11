const { connect } = require('../models/dataBase')
const usersModel = require('../models/UsersSchema')

connect()

const signUp = (request, response) => {
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