const { Article, Category, User } = require("../models/index")

class categoriesController {

    static async readAllCategory(request, response, next) {
        try {
            const allCategory = await Category.findAll()

            console.log(allCategory);
            response.status(200).json({
                message: allCategory
            })

        }
        catch (err) {
            next(err)

        }
    }

    static async addCategory(request, response, next) {
        try {

            const { name } = request.body
            // console.log(name);

            const created = await Category.create({ name })
            // console.log(created);

            response.status(201).json({
                message: created,
            })

        } catch (err) {
            next(err)

        }
    }

    static async deleteCategory(request, response, next) {
        const { id } = request.params


        try {
            const oneCategory = await Category.findOne({ where: { id } })

            const deleteCategory = await Category.destroy({ where: { id } })


            if (!oneCategory) {
                throw { name: "idNotFound" }
            } else {
                response.status(201).json({
                    message: `${oneCategory.name} success to delete`
                })
            }

        }
        catch (err) {
            next(err)
        }

    }


}

module.exports = categoriesController