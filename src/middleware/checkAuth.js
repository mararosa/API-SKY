const jwt = require('jsonwebtoken');
const SECRET = "umEHhDyErggnyUWMSQL1SsBgVc309uELyJVr1Wyrnc0oztFHuaVfu3GqNYyo9J8";

module.exports = (request, response, next) => {
try {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);
    request.userData = decoded;
    next();
} catch (error) {
    return response.status(401).json({
        message: 'Não Autorizado'
    });
}
}