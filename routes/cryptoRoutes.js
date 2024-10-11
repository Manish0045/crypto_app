const express = require("express");
const { getCryptoDeviation, getCryptoStats } = require("../controllers/cryptoController");
const router = express.Router();


router
    .get('/stats', getCryptoStats)
    .get('/deviation', getCryptoDeviation)


module.exports = router;