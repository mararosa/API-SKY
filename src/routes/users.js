const express = require('express');
const router = express.Router();
const controller = require("../controllers/UsersController.js")

router.post('/signUp', controller.signUp)
router.post('/signIn', controller.signIn)
router.delete('/:userId', controller.remove)

module.exports = router