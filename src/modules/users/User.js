/*
* NPM Dependencies
*
* */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
* Create a schema
*
* */
const UserSchema = new Schema(
    {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        method: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            required: true,
        },
        local: {
            email: {
                type: String,
                lowercase: true,
                unique: true
            },
            password: {
                type: String,
            },
        },
        google: {
            id: {
                type: String,
            },
            email: {
                type: String,
                lowercase: true,
            },
        },
        facebook: {
            id: {
                type: String,
            },
            email: {
                type: String,
                lowercase: true,
            },
        },
    },
    {timestamps: true},
);

/*
* Create and export a model
*
* */
module.exports = User = mongoose.model('User', UserSchema);
