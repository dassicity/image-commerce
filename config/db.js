const { Sequelize } = require('sequelize');

const createDb = new Sequelize('image-db', 'dassicity', 'password', {
    dialect: 'sqlite',
    host: './config/db.sqlite'
});

const connectDb = () => {
    createDb.sync()
        .then(() => {
            console.log("Connection to DB established!");
        })
        .catch((err) => {
            console.log(err);
        });
}

const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");

// Association to link userModel to orderModel
orderModel.belongsTo(userModel, { foreignKey: "buyerID" });
userModel.hasMany(orderModel, { foreignKey: "id" });

module.exports = { createDb, connectDb };