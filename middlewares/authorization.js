const { User, Article } = require("../models/index")

async function authorization(request, response, next) {
    try {
        const { role } = request.dataUser
        const { userId } = request.dataUser
        const { id } = request.params

        if (role !== "admin") {
            const article = await Article.findOne({ where: { id } })

            // console.log(article);

            if (article.authorId !== userId) throw { name: "Forbidden" }
        }

        next()

    } catch (err) {
        next(err)

    }
}

async function authorizationStatus(request, response, next) {
    try {
        const { role } = request.dataUser

        if (role !== "admin") throw { name: "Forbidden" }

        next()

    } catch (err) {
        next(err)

    }
}



module.exports = { authorization, authorizationStatus }