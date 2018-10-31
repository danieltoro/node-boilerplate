/*
* NPM Depedencies
*
* */
const express = require('express');
const morgan = require('morgan');


/*
* Export Middlewares
*
* */
module.exports = app => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(morgan('dev'))
};

