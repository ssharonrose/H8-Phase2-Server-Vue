const { Article } = require('../models/index.js')
const dataArticle = require('../data/article.json')


async function inputArticleData() {
    try {
        await Article.bulkInsert(dataArticle)
    } catch (err) {
        console.log(err)
    }

}

module.exports = { inputArticleData }