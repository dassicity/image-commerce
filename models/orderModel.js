const { DataTypes, Model } = require('sequelize');
const { createDb } = require('../config/db');

const User = require('./userModel');

const Order = createDb.define("orders", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    productID: DataTypes.INTEGER,
    // productName: DataTypes.STRING,
    // productPrice: DataTypes.DECIMAL,
    buyerID: DataTypes.INTEGER,
    // buyerEmail: DataTypes.STRING,

});

module.exports = Order;