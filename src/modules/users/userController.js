/*
* NPM Dependencies
*
* */
const JWT = require('jsonwebtoken');

/*
* Import JWT Secret
*
* */
const {JWT_SECRET} = require('../../config/constants');

/*
* Import User Model
*
* */
const User = require('./User');


signToken = user => {
    return JWT.sign({
        iss: 'Starterkit',
        sub: user.id,
        iat: new Date().getTime(), // Current time
        exp: new Date().setDate(new Date().getDate() + 1), // Current time + day ahead
    }, JWT_SECRET);
};


module.exports = {
    signUp: async (req, res) => {
        const {firstname, lastname, email, password} = req.value.body;

        // Check if there is a user with the same email
        const foundUser = await User.findOne({'local.email': email});
        if (foundUser) {
            return res.status(403).send({error: 'Email is already taken'});
        }

        // Create a new User
        const newUser = new User({
            firstname,
            lastname,
            method: 'local',
            local: {
                email,
                password,
            },
        });

        await newUser.save();

        // Generate the token
        const token = signToken(newUser);

        // Respond with token
        return res.status(200).json({token: 'Bearer ' + token});
    },

    logIn: async (req, res) => {
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    googleOAuth: async (req, res) => {
        console.log('User Controller googleOAuth() called!')
    },

    facebookOAuth: async (req, res) => {
        console.log('User Controller facebookOAuth() called!')
    },

    current: async (req, res) => {
        console.log('User Controller current() called!')
    },

    secret: async (req, res) => {
        console.log('User Controller secret() called!');
    },
};


