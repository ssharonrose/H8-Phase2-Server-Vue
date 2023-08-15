const { comparePassword, hashPassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { Article, Category, User, History, Customer, Bookmark } = require("../models/index")
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const { Op } = require('sequelize')
const axios = require("axios")

class customersController {


    static async register(request, response, next) {

        try {
            const { email, password } = request.body

            const customer = await Customer.create({ email, password, role: "customer" })

            response.status(201).json({
                message: {
                    id: customer.id,
                    email: customer.email,
                    role: customer.role
                }
            })
        } catch (err) {
            next(err)
        }

    }


    static async login(request, response, next) {
        try {
            const { email, password } = request.body
            console.log(password, "<<<<<<<<");

            const customer = await Customer.findOne({
                where: {
                    email
                }
            })

            console.log(customer.password);

            if (!customer) throw { name: "InvalidUser" }

            const isValidPassword = comparePassword(password, customer.password)

            if (!isValidPassword) throw { name: "InvalidPassword" }

            const token = signToken({
                id: customer.id,
                email: customer.email
            })


            response.status(200).json({
                access_token: token,
                id: customer.id,
                email: customer.email,
                role: customer.role
            })

        } catch (err) {
            next(err)
        }
    }

    // GOOGLE LOGIN
    static async loginGoogle(request, response, next) {
        try {
            // console.log(request.headers);
            const ticket = await client.verifyIdToken({

                idToken: request.body.google_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload()
            // console.log(payload.email, payload.name);

            console.log(payload, "ini payload");
            // ini prose pencocokan data, kalo gaada, dy create
            const [customer, isCreated] = await Customer.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    password: "customer",
                    role: "customer"
                }
            })

            console.log(customer, "ini customer");

            const access_token = signToken({
                id: customer.id,
                email: customer.email,
                role: customer.role,
            })
            response.status(200).json({ access_token, email: customer.email })
        }
        catch (err) {
            // console.log(err);
            next(err)

        }
    }

    static async readAllArticle(request, response, next) {
        try {
            console.log('disini Cust Pag Controller')
            let { limit, page, category, title } = request.query 
            console.log(limit, page, category)
            let where = {
                status: 'active',
            }
            if (!limit) {
                limit = 8
            }
            if (!page) {
                page = 1
            }
            if (category) {
                where.categoryId = +category
            }
            if (!title) {
                title = ""
            }
            if (title) {
                where.title = {
                    [Op.iLike]: `%${title}%`
                }
            }

            const data = await Article.findAndCountAll({
                include: {
                    model: Category
                },
                limit: limit, //maks brp post
                offset: (page - 1) * limit, // ini buat kek klo page 2, mulai dari data keberapa
                order: [["title", "ASC"]],
                where: where,
            })
            console.log(where)

            const totalPage = Math.ceil(data.count / limit)


            console.log(totalPage)
            response.status(200).json({
                statusCode: 200,
                data,
                totalPage
            })

        } catch (err) {
            console.log(err)

            next(err)
        }
    }

    


    static async readArticleById(request, response, next) {

        try {
            const { articleId } = request.params
            console.log(articleId);

            const oneArticle = await Article.findOne({
                where: { id: articleId },
                include: User
            })

            const qrCode = await axios.post(
                `https://api.qr-code-generator.com/v1/create?access-token=${process.env.token_qr}`,
                {
                    
                    "frame_name": "no-frame",
                    "qr_code_text": `https://kampasnewsnew.web.app/customers/article/${articleId}`,
                    "image_format": "SVG",
                    "qr_code_logo": "scan-me-square"
                }
            );

            console.log(oneArticle);

            if (!oneArticle) {
                throw { name: "idNotFound" }
            } else {
                response.status(200).json({
                    message: oneArticle,
                    qr: qrCode.data
                })
            }

        }
        catch (err) {
            next(err)
        }
    }

    static async addArticleBookmark(request, response) {
        try {
            const { articleId } = request.params
            const { CustomerId } = request.dataCustomer

            console.log(articleId);

            const article = await Article.findByPk(articleId)

            if (!article) throw { name: "idNotFound" }

            const [bookmark, isCreated] = await Bookmark.findOrCreate({
                where: {
                    ArticleId: article.id,
                    CustomerId: CustomerId,
                },
                defaults: {
                    CustomerId: CustomerId,
                    ArticleId: article.id
                }
            })

            response.status(201).json(bookmark)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async readBookmark(request, response) {
        try {

            const { CustomerId } = request.dataCustomer


            const data = await Bookmark.findAll({ where: { CustomerId }, include: Article })

            console.log(data);
            response.status(200).json(data)


        } catch (error) {
            next(error)

        }
    }


    static async deleteArticleBookmark(request, response, next) {

        try {
            const { articleId } = request.params
            const oneArticle = await Article.findOne({ where: { articleId } })

            const deleteArticle = await Bookmark.destroy({ where: { ArticleId: articleId } })

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





}

module.exports = customersController