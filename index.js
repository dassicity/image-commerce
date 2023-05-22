const exp = require('constants');
const express = require('express');

const { connectDb } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')
const PORT = 1339;

const app = express();

// middlewares
app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({ extended: false }));

// routing middlewares
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);

app.listen(PORT, () => {
    console.log(`Listening for requests ar port - ${PORT} !`);
    connectDb();
});