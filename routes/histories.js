const express = require("express")
// const { get } = require(".")
const router = express.Router()
const Controller = require("../controllers/historiesController")

router.get("/", Controller.readHistory)


module.exports = router