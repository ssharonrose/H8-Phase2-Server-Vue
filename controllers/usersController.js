const { findOne } = require("sequelize/lib/model");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Article, Category, User } = require("../models/index")
const { all } = require("../routes")
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class UsersController {


    static async register(request, response, next) {
        try {

            const { email, password, username, phoneNumber, address } = request.body
            // console.log(email, password);

            const created = await User.create({ email, password, username, phoneNumber, address, role: "admin" })
            response.status(201).json({
                message: {
                    id: created.id,
                    email: created.email,
                    role: created.role
                }
            })

        }
        catch (err) {
            next(err)
        }
    }

    static async login(request, response, next) {
        try {
            const { email, password } = request.body
            console.log(email, password);

            const user = await User.findOne({ where: { email } })

            if (!user) { throw { name: "InvalidUser" } }


            const isValidPassword = comparePassword(password, user.password)
            if (!isValidPassword) {
                throw { name: "InvalidPassword" }
            }
            console.log(user);


            const token = signToken({
                id: user.id,
                email: user.email,
                role: user.role
            })

            response.status(200).json({
                access_token: token, username: user.username, role: user.role
            })
        }
        catch (err) {
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
            const [user, isCreated] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    password: "staff",
                    role: "staff"
                }
            })

            console.log(user, "ini user");

            const access_token = signToken({
                username: user.username,
                id: user.id,
                email: user.email,
                role: "staff"
            })
            response.status(200).json({ access_token, username: user.username })
        }
        catch (err) {
            next(err)

        }
    }

    static async readAllUser(request, response, next) {

        try {
            const allUser = await User.findAll()

            response.status(200).json({
                message: allUser
            })

        }
        catch (err) {
            next(err)

        }

    }


}

module.exports = UsersController