const CryptoPrice = require("../models/cryptoPrice");

const getCryptoStats = async (req, res) => {
    const { coin } = req.query;
    if (!coin) {
        return res.status(400).json({ error: 'Coin is required' });
    }

    try {
        const latestData = await CryptoPrice.findOne({ coin }).sort({ timestamp: -1 });

        if (!latestData) {
            return res.status(404).json({ error: `No data found for coin: ${coin}` });
        }

        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h,
        });
    } catch (error) {
        console.error('Error fetching data:', error); // Added logging
        res.status(500).json({ error: 'Error fetching data' });
    }
};

const getCryptoDeviation = async (req, res) => {
    const { coin } = req.query;
    if (!coin) {
        return res.status(400).json({ error: 'Coin is required' });
    }

    try {
        const prices = await CryptoPrice.find({ coin }).sort({ timestamp: -1 }).limit(100).select('price');

        if (prices.length < 2) {
            return res.status(400).json({ error: 'Not enough data points' });
        }

        const priceArray = prices.map((doc) => doc.price);
        const mean = priceArray.reduce((sum, price) => sum + price, 0) / priceArray.length;

        const variance = priceArray.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / priceArray.length;
        const standardDeviation = Math.sqrt(variance);

        res.json({ deviation: parseFloat(standardDeviation.toFixed(2)) });
    } catch (error) {
        console.error('Error calculating deviation:', error); // Added logging
        res.status(500).json({ error: 'Error calculating deviation' });
    }
};


module.exports = { getCryptoStats, getCryptoDeviation };
