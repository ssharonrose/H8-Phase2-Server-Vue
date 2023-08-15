const { Article, Category, User, History } = require("../models/index")

class articlesController {

    static async addArticle(request, response, next) {
        try {

            const { userId } = request.dataUser
            const { email } = request.dataUser

            const { title, content, imgUrl, categoryId } = request.body

            const created = await Article.create({ title, content, imgUrl, authorId: userId, categoryId })

            const history = await History.create({
                name: title,
                description: `Article with id ${created.id} created`,
                updatedBy: email
            })

            console.log(created);

            response.status(201).json({
                message: created,
            })

        }
        catch (err) {
            next(err)
        }

    }

    static async readAllArticle(request, response, next) {
        try {


            const read = await Article.findAll({
                include: User
            })

            // console.log(read);

            response.status(200).json({
                message: read,
            })
        }
        catch (err) {
            next(err)
        }

    }

    static async readArticleById(request, response, next) {

        try {
            const { id } = request.params
            console.log(request.params);
            const oneArticle = await Article.findOne({
                where: { id }
            })

            console.log(oneArticle);

            if (!oneArticle) {
                throw { name: "idNotFound" }
            } else {
                response.status(200).json({
                    message: oneArticle
                })
            }

        }
        catch (err) {
            next(err)
        }
    }

    static async deleteArticle(request, response, next) {

        try {
            const { id } = request.params
            const oneArticle = await Article.findOne({ where: { id } })

            const deleteArticle = await Article.destroy({ where: { id } })

            console.log(deleteArticle.title);

            if (!oneArticle) {
                throw { name: "idNotFound" }
            } else {
                response.status(201).json({
                    message: `${oneArticle.title} success to delete`
                })
            }

        }
        catch (err) {
            next(err)
        }

    }

    static async editArticle(request, response, next) {

        try {
            const { email } = request.dataUser
            const { id } = request.params
            const { title, content, imgUrl, categoryId } = request.body
            console.log("masuk edit <<<<<<<<<<<<<<<<<<<<<");
            console.log(title, content, imgUrl, categoryId);


            const updated = await Article.update({
                title, content, imgUrl, categoryId
            },
                {
                    where: {
                        id: id
                    }
                })

            if (!updated) throw { name: "idNotFound" }

            const history = await History.create({
                name: title,
                description: `Article with id ${id} updated`,
                updatedBy: email
            })

            console.log(updated);

            response.status(201).json({
                message: updated
            })

        }
        catch (err) {
            next(err)
        }

    }

    static async editStatusArticle(request, response, next) {

        try {
            const { id } = request.params
            const { status } = request.body
            const { email } = request.dataUser


            const oneArticle = await Article.findOne({ where: { id } })

            const statusUpdated = await Article.update({
                status
            },
                {
                    where: {
                        id: id
                    }
                })

            // console.log(updated);

            if (!statusUpdated) throw { name: "idNotFound" }


            const history = await History.create({
                name: oneArticle.title,
                description: `Article status with id ${oneArticle.id} has been updated from Active into Inactive`,
                updatedBy: email
            })

            response.status(201).json({
                message: statusUpdated,
            })

        }
        catch (err) {
            next(err)
        }

    }

}

module.exports = articlesController
