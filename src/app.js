/*
* NPM Dependencies
*
* */
const express = require('express');
const morgan = require('morgan');

/*
* Express instance
*
* */
const app = express();

/*
* Middlewares
*
* */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));





module.exports = app;