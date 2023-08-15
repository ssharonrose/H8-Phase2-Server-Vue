'use strict';

/** @type {import('sequelize-cli').Migration} */

const { hashPassword } = require('../helpers/bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    
    const users = require("../data/user.json")
    
    users.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashPassword(el.password)
    })
    
    await queryInterface.bulkInsert("Users", users)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", users)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
