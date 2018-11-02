/*
* NPM Dependencies
*
* */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

module.exports = User = mongoose.model('User', UserSchema);
