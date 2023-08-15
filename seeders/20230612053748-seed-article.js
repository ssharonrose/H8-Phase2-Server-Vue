'use strict';

/** @type {import('sequelize-cli').Migration} */

const articles = require("../data/article.json")

articles.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
  el.status = "active"
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Articles", articles)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", articles)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
