const { History } = require("../models/index")

class HistoryController {

    static async readHistory(request, response, next) {
        try {
            const allHistory = await History.findAll({
                order: [["createdAt", "DESC"]]
            })

            response.status(200).json({
                message: allHistory
            })

        }
        catch (err) {
            next(err)

        }
    }

}

module.exports = HistoryController