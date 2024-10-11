const express = require("express");
const fetchCryptoData = require('./utils/cryptoJob');
const cryptRoutes = require("./routes/cryptoRoutes");

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: "Server is working... You will get data from different routes"
    });
});

app.use('/api/v1', cryptRoutes);

fetchCryptoData();


module.exports = app;
