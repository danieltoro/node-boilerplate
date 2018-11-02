/*
* Import dotenv config
*
* */
require('dotenv').config();

/*
* Development config
*
* */
const devConfig = {
    MONGO_URL: process.env.MONGO_URL_DEV,
    JWT_SECRET: process.env.JWT_SECRET_DEV,
};

/*
* Testing config
*
* */
const testConfig = {
    MONGO_URL: process.env.MONGO_URL_TEST,
    JWT_SECRET: process.env.JWT_SECRET_TEST,
};

/*
* Production config
*
* */
const prodConfig = {
    MONGO_URL: process.env.MONGO_URL_PROD,
    JWT_SECRET: process.env.JWT_SECRET_PROD,
};

/*
* Default config
*
* */
const defaultConfig = {
    PORT: process.env.PORT || 3000,
    oauth: {
        google: {
            clientID: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
        },
        facebook: {
            clientID: process.env.FACEBOOK_CLIENTID,
            clientSecret: process.env.FACEBOOK_CLIENTSECRET,
        },
    },
    ContactForm: {
        USER: process.env.USERNAME,
        PASS: process.env.PASSWORD,
        SERVER: process.env.SMPT_SERVER,
        PORT: process.env.SMPT_PORT,
    },
};

/*
* Enviroment configuration
*
* */
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

/*
* Export default config + enviroment config
*
* */
module.exports = {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV),
};