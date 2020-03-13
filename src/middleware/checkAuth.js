const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

module.exports = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);
    request.decoded = decoded;
    next();
  } catch (error) {
    return response.status(401).json({
      message: "Não Autorizado"
    });
  }
};
