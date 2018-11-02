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
* Import Middlewares config
*
* */
const apiRoutes = require('./modules');

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

/*
* Wrap all the API routes
*
* */
apiRoutes(app);


app.get('/', (req, res) => {
    res.send('Holiiii');
});


module.exports = app;
