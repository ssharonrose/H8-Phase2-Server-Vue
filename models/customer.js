'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

// const bookmark = require('./bookmark');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Customer.hasMany(models.Article)
      Customer.belongsToMany(models.Article, { through: models.Bookmark, foreignKey: "CustomerId", otherKey: "ArticleId" })
      // define association here
    }
  }
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "email telah terdaftar"},
      validate: {
        notNull: {
          msg: "email cannot be empty"
        },
        notEmpty: {
          msg: "email cannot be empty"
        },
        isEmail: {
          msg: "Format email tidak valid!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be empty"
        },
        notEmpty: {
          msg: "password cannot be empty"
        },
        len: {
          args: [5],
          msg: "The password must have a minimum of 5 characters"
        }
      }
    },
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate((customer) => {
    customer.password = hashPassword(customer.password)
  })
  return Customer;
};