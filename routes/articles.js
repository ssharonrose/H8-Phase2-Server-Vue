const express = require("express")
// const { get } = require(".")
const router = express.Router()
const Controller = require("../controllers/articlesController")
const { authorization, authorizationStatus } = require("../middlewares/authorization")

router.get("/", Controller.readAllArticle)
router.post("/", Controller.addArticle)
router.get("/:id", Controller.readArticleById)
router.put("/:id", Controller.editArticle)
router.patch("/:id", authorizationStatus, Controller.editStatusArticle)
router.delete("/:id", authorization, Controller.deleteArticle)

module.exports = router