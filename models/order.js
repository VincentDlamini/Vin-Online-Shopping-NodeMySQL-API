'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // A one-to-one relationship between Order and Customer
      Order.belongsTo(models.Customer, {
        foreignKey: 'customerId'
      });

      // A one-to-many relationship between Order and OrderedItems
      Order.hasMany(models.OrderedItem, {
        foreignKey: 'orderId'
      });

      // A one-to-many relationship between Order and Payments
      Order.hasMany(models.Payment, {
        foreignKey: 'orderId'
      });
    }
  }
  Order.init({
    customerId: DataTypes.INTEGER,
    orderDate: DataTypes.DATE,
    totalCost: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};