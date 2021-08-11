require('dotenv').config();

const { SHOPIFY_ACCESS_TOKEN } = process.env;

module.exports = {
    env: {
        SHOPIFY_ACCESS_TOKEN,
    },
    reactStrictMode: true,
};
