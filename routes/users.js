const express = require("express")
const router = express.Router()
const UsersController = require("../controllers/usersController")

router.get("/", UsersController.readAllUser)

module.exports = router