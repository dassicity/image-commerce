const { DataTypes, Model } = require('sequelize');
const { createDb } = require('../config/db');

// class User extends Model { }

// User.init()

// This is one way of doing

// There is another way of doing the same thing

const User = createDb.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isSeller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = User;