require('dotenv').config();

const devConfig = {
    MONGO_URL: process.env.MONGO_URL_DEV,
    JWT_SECRET: process.env.JWT_SECRET_DEV,
};

const testConfig = {
    MONGO_URL: 'mongodb://localhost/nodejs-api-boilerplate-test',
    JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
};

const prodConfig = {
    MONGO_URL: process.env.MONGO_URL_PROD,
    JWT_SECRET: process.env.JWT_SECRET_PROD,
};

const defaultConfig = {
    PORT: process.env.PORT || 3000,
};

function envConfig(env) {
    switch (env) {
        case 'development':
            return devConfig;
        case 'test':
            return testConfig;
        default:
            return prodConfig;
    }
}

module.exports = {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV),
};