const User = require('./User');

module.exports = {
    signUp: async (req, res) => {
        console.log('User Controller signUp() called!')
    },
    logIn: async (req, res) => {
        console.log('User Controller logIn() called!')
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
};


