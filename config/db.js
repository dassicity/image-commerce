const { sequelize } = require('sequelize');

const createDb = new sequelize('image-db', 'dassicity', 'password', {
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

module.exports = { createDb, connectDb };