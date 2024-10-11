const mongoose = require("mongoose");


const CryptoPriceSchema = mongoose.Schema({
    coin: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    "24hChange": {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CryptoPrice = mongoose.model("CryptoPrice", CryptoPriceSchema);

module.exports = CryptoPrice;