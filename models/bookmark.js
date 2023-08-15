'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Customer)
      Bookmark.belongsTo(models.Article)
    }
  }
  Bookmark.init({
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ArticleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};