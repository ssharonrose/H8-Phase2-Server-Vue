

async function authorizationCust(request, response, next) {
    try {
        console.log("masuk author cust");

        console.log(request.dataCustomer);

        if (!request.dataCustomer) throw { name: "Forbidden" }

        const { role } = request.dataCustomer

        if (role !== "customer") throw { name: "Forbidden" }

        next()

    } catch (err) {
        next(err)

    }
}


module.exports = authorizationCust 