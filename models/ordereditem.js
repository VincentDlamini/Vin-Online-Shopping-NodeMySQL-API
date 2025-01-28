'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderedItem extends Model {
    static associate(models) {
      // Existing association: one-to-one relationship between OrderedItem and Order
      OrderedItem.belongsTo(models.Order, {
        foreignKey: 'orderId'
      });

      // Added association: many-to-one relationship between OrderedItem and Product
      OrderedItem.belongsTo(models.Product, {
        foreignKey: 'productId'
      });
    }
  }
  OrderedItem.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    unitPrice: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'OrderedItem',
  });
  return OrderedItem;
};
