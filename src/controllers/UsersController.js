const { connect } = require('../models/dataBase')
const usersModel = require('../models/UsersSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Secret = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMvjU3H0JWqXLTN1krauUYFEziZLTm8iLmDjL1TUg6u+58PZY0olHh3hou/q5EdOU5y5P1UmIAQ0SquueCXw2NSvevDstQ3pq5EJDzsLq5mU8S/IAQNXMO5T+hSQ+SsMkBHKS2IgjWC3v4Aqn/s4ZCFbG7qfSf3RIgZshbSuZDbNAgMBAAECgYEAltHnJTFkCDAiSKGdULMsKYKbOCqWr5DKW/NSTN8TM5V5Xh/N2cgROitx2yWXjcO8B//kgHk+T73aypq5198MlR0Ks7tPCv+vMIXflobSRj+Hqas68X24PSss4REq70fUBUbI2hMeiVhOSxtwKWhL5v4uQmQseIia2dUUKmJ8XaUCQQD1SUpwXkc9ABe3OV89zhfqAjb4SCnF5/EqkfjG7/ns3e/Q6sxanDEkglW6rmsjT4x0DqV7ziWlDTG1WP8EC+YvAkEA1MsiHFKErFob12yicD2ZD9zebLT2/Nu/vDVH+NftLH/x6oRTPMIuMUTpCGDaYj6lSw9MI7IawV5ENLt8K/LvwwJAYOQyo3Cac142AAqJtMBUcfut+yWGWsbkXQyMWQkykH6a3MvjLWfFgcZ6VuPPLoOd17pxZBZqiGhN2nTtR4vrwQJAJVYa/xMvejo5RlwmSEFWmOTtFe/OomFATBqhLTVdxQASB07+d9uuVTC9Hp430yMgx4HAn0bB0QnkN8hpqiBvFwJALPRxgbjIK51DstortwIGAas9n7UUYWA74uXfGDLkuV9knq0/1T7F2VU4HuYKfHEneXLk/W55bCDc2OBinkAVwA=="

connect()

const signUp = async (request, response) => {
    const user = await usersModel.find({ email: request.body.email })
    if (user.length >= 1) {
        return response.status(409).json({
            message: "E- mail ja existe"
        });
    } else {
        const senhaCriptografada = bcrypt.hashSync(request.body.senha)
        request.body.senha = senhaCriptografada
        const newUser = new usersModel(request.body)
        newUser.save((error) => {
            if (error) {
                return response.status(500).json({
                    error: error
                });
            }
            return response.status(201).send(newUser)
        });
    }
}


const signIn = async (request, response) => {
    const user = await usersModel.findOne({ email: request.body.email })
    if (user) {
        const correctPassword = bcrypt.compareSync(request.body.senha, user.senha)
        if (correctPassword) {
            const token = jwt.sign(
                {}, //payload
                Secret,
                { expiresIn: 1800 }
            )
            return response.status(200).send({ user, token })
        }
        return response.status(401).json({
            message: 'Usuario e/ou senha invalidos'
        })
    }
    return response.status(401).json({
        message: 'Usuario e/ou senha invalidos'
    })
}

const remove = (request, response) => {
    const userId = request.params.userId
    usersModel.findByIdAndDelete(userId, (error, user) => {
        if (user) {
            return response.status(200).json({
                message: "Usuário deletado"
                });
            }
        return response.status(500).json({
            error: error
        });
    });
}


module.exports = {
    signUp,
    signIn,
    remove,
}