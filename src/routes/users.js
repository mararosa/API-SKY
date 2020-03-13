const express = require("express");

const router = express.Router();
const controller = require("../controllers/UsersController.js");
const checkAuth = require("../middleware/checkAuth");

router.post("/signUp", controller.signUp);
router.post("/signIn", controller.signIn);
router.get("/search/:userId", checkAuth, controller.searchUser);
router.delete("/:userId", checkAuth, controller.remove);

module.exports = router;
