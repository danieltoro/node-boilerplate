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


app.get('/', (req, res) => {
    res.send('Holiiii');
});


module.exports = app;