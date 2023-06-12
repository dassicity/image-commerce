const exp = require('constants');
const express = require('express');
require('dotenv').config();

const { connectDb } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes')
const PORT = process.env.PORT;

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

// middlewares
app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({ extended: false }));

//swagger init
const specs = swaggerJsDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Photo Shop API",
            version: "1.0.0",
            description: "Buy/Sell Photos"
        },
        servers: [{
            url: process.env.BASE_URL,
        }],
    },
    apis: ["./routes/*.js", "./controllers/*.js"]
});

// routing middlewares
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);

app.listen(PORT, () => {
    console.log(`Listening for requests ar port - ${PORT} !`);
    connectDb();
});