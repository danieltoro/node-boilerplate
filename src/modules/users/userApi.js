const express = require('express');
const passport = require('passport');

const passportConf = require('../../services/passport');

const userController = require('./userController');

const {validateBody, schemas} = require('./userValidations');

const routes = express.Router();


/*
* @route        POST api/user/signup
* @description  Register users route
* @access       Public
* */
routes.post('/signup', validateBody(schemas.authSchema), userController.signUp);

/*
* @route        POST api/user/login
* @description  Register users route
* @access       Public
* */
routes.post('/login', userController.logIn);

/*
* @route        POST api/user/google
* @description  Register users route
* @access       Public
* */
routes.post('/google', userController.googleOAuth);

/*
* @route        POST api/user/facebook
* @description  Register users route
* @access       Public
* */
routes.post('/facebook', userController.facebookOAuth);

/*
* @route        GET api/user/current
* @description  Register users route
* @access       Private
* */
routes.get('/current', userController.current);

/*
* @route        GET api/user/current
* @description  Register users route
* @access       Private
* */
routes.get(
    '/secret',
    passport.authenticate('jwt', {session: false}),
    userController.secret
);

module.exports = routes;
