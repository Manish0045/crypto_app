// src/services/cronService.js
const cron = require('node-cron');
const axios = require('axios');
const CryptoData = require('../models/cryptoPrice');

const fetchCryptoData = async () => {
    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/simple/price',
            {
                params: {
                    ids: 'bitcoin,ethereum,matic-network',
                    vs_currencies: 'usd',
                    include_market_cap: true,
                    include_24hr_change: true,
                },
            }
        );
        const { bitcoin, ethereum, 'matic-network': matic } = response.data;

        const cryptoArray = [
            { coin: 'bitcoin', ...bitcoin },
            { coin: 'ethereum', ...ethereum },
            { coin: 'matic', ...matic },
        ];

        cryptoArray.forEach(async (crypto) => {
            const cryptoData = new CryptoData({
                coin: crypto.coin,
                price: crypto.usd,
                marketCap: crypto.usd_market_cap,
                "24hChange": crypto.usd_24h_change,
            });
            await cryptoData.save();
        });

        console.log('Crypto data saved');
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
};

// Cron job that runs every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

module.exports = fetchCryptoData;