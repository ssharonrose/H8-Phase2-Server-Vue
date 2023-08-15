const express = require("express")
const articlesController = require("../controllers/articlesController")
const router = express.Router()
const customersController = require("../controllers/customersController")
const { authenticationCust } = require("../middlewares/authenticationCust")
const authorizationCust = require("../middlewares/authorizationCust")


router.post("/register", customersController.register)

router.post("/login", customersController.login)
router.use("/glogin", customersController.loginGoogle) //punya google


router.get("/articles", customersController.readAllArticle)
router.get("/categories", customersController.readAllCategory)
router.get("/articles/:articleId", customersController.readArticleById)


router.use(authenticationCust)
// ini tuh penjaga role harus customer
router.post("/bookmark/:articleId", customersController.addArticleBookmark)
router.get("/bookmark/", customersController.readBookmark)

module.exports = router