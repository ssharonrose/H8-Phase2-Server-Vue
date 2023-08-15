const express = require("express")
const router = express.Router()
const ControllerCategory = require("../controllers/categoriesController")

router.get("/", ControllerCategory.readAllCategory)
router.post("/", ControllerCategory.addCategory)
router.delete("/:id", ControllerCategory.deleteCategory)

module.exports = router