'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      // A one-to-one relationship between Payment and Order
      Payment.belongsTo(models.Order, {
        foreignKey: 'orderId'
      });
    }
  }
  Payment.init({
    orderId: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    paymentDate: DataTypes.DATE,
    amount: DataTypes.DECIMAL(10, 2) 
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};