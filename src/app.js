/*
* NPM Dependencies
*
* */
const express = require('express');

/*
* Import Middlewares config
*
* */
const middlewaresConfig = require('./config/middlewares');

/*
* Express instance
*
* */
const app = express();

/*
* Wrap all the middlewares with the server
*
* */
middlewaresConfig(app);





module.exports = app;