const express = require('express');

const PORT = 1339;

const app = express();

app.listen(PORT, () => {
    console.log("Listening for requests !");
})