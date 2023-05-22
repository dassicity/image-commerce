const exp = require('constants');
const express = require('express');

const { connectDb } = require('./config/db');
const PORT = 1339;

const app = express();

// middlewares
app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log("Listening for requests !");
    connectDb();
});