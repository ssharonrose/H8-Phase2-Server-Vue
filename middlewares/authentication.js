const { response } = require("express");
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index")

// const authentication = async (request, response, next) => {

// }

//ngecheck udah login atau belum
async function authentication(request, response, next) {
    try {

        // console.log(access_token);
        const { access_token } = request.headers
        // console.log(access_token);

        if (!access_token) throw { name: "Unauthenticated" }

        const payload = verifyToken(access_token) //unpack access token

        // console.log(payload);

        // kalo access tokennya ga sama, harus di cek
        if (!payload) throw { name: "JsonWebTokenError" }

        const user = await User.findOne({
            where: {
                id: payload.id
            }
        })

        // console.log(user);

        // kalo usernya gaada, harus di handle
        if (!user) throw { name: "NotFound" }

        request.dataUser = {
            userId: payload.id,
            email: payload.email,
            role: payload.role
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication }