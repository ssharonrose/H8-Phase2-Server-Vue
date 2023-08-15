require("dotenv").config()

const express = require('express')
const app = express()
const PORT = process.env.PORT


const cors = require("cors")
const { errorHandler } = require("./middlewares/errorHandler")

const router = require("./routes/index")
// const { authorization } = require("./middlewares/authorization")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})

module.exports = app