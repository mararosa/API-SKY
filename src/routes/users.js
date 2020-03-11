const express = require('express');
const router = express.Router();
const controller = require("../controllers/UsersController.js")

router.post('/signUp', controller.signUp)

module.exports = router