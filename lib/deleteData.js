const { Customer } = require('../models/index')

async function DeleteData() {
    try {
        await Customer.destroy({
            cascade: true,
            truncate: true,
            restartIdentity: true,
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = DeleteData