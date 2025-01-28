'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Added association: one-to-many relationship between Product and OrderedItem
      Product.hasMany(models.OrderedItem, {
        foreignKey: 'productId'
      });

      // Added association: many-to-one relationship between Product and Category
      Product.belongsTo(models.Category, { 
        foreignKey: 'categoryId' 
      });
    }
  }
  Product.init({
    productName: DataTypes.STRING,
    productDescription: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2), 
    quantityOnHand: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};