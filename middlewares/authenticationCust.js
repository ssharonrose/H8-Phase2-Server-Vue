const { response } = require("express");
const { verifyToken } = require("../helpers/jwt");
const { Customer } = require("../models/index")


//ngecheck udah login atau belum
async function authenticationCust(request, response, next) {
    try {

        // console.log(access_token);
        const { access_token } = request.headers
        // console.log(access_token);

        if (!access_token) throw { name: "JsonWebTokenError" }

        const payload = verifyToken(access_token) //unpack access token

        // console.log(payload);

        // kalo access tokennya ga sama, harus di cek
        if (!payload) throw { name: "JsonWebTokenError" }

        const customer = await Customer.findByPk(payload.id)

        // console.log(Customer);

        // kalo Customernya gaada, harus di handle
        if (!customer) throw { name: "NotFound" }

        if (customer.role !== "customer") throw { name: "Unauthenticated" }

        request.dataCustomer = {
            CustomerId: payload.id,
            email: payload.email,
            role: customer.role
        }
        next()


    } catch (err) {
        next(err)
    }
}

module.exports = { authenticationCust }