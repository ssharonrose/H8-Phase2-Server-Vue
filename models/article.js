'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User, { foreignKey: "authorId" })
      Article.belongsTo(models.Category, { foreignKey: "categoryId" })

      // Article.hasMany(models.User)
      Article.belongsToMany(models.Customer, { through: models.Bookmark, foreignKey: "ArticleId", otherKey: "CustomerId" })

      // define association here
    }
  }
  Article.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title article cannot be empty"
        },
        notEmpty: {
          msg: "title article cannot be empty"
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "content article cannot be empty"
        },
        notEmpty: {
          msg: "content article cannot be empty"
        }
      }
    },
    imgUrl: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};

