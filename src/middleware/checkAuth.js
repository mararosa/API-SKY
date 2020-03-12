const jwt = require('jsonwebtoken');
const SECRET = "umEHhDyErggnyUWMSQL1SsBgVc309uELyJVr1Wyrnc0oztFHuaVfu3GqNYyo9J8";

module.exports = (request, response, next) => {
    const authHeader = request.get('authorization')
    let autenticado = false
    if (!authHeader) {
        return response.status(401).json({
            message: 'Você precisa fazer login'
        });
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, SECRET, (error, decoded) => {
        if (error) {
            autenticado = false
        } else {
            autenticado = true
        }
    }
    )
    if (!autenticado) {
        return response.status(403).json({
            message: 'Não autorizado'
        });
    }
    next()
};