const express = require('express')
const router = express.Router()
const articlesRouter = require("./articles")
const usersRouter = require("./users")
const categoriesRouter = require("./categories")
const historiesRouter = require("./histories")
const customersRouter = require("./customers")
const UsersController = require("../controllers/usersController")
const { authentication } = require("../middlewares/authentication")


router.use("/register", UsersController.register)

router.use("/auth/google-sign-in", UsersController.loginGoogle) //punya google

router.use("/login", UsersController.login)

router.use("/customers", customersRouter)

router.use(authentication)




// router.use(authe)
router.use("/articles", articlesRouter)
router.use("/users", usersRouter)
router.use("/categories", categoriesRouter)
router.use("/histories", historiesRouter)




module.exports = router


