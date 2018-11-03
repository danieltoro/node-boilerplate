/*
* NPM Dependencies
*
* */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

UserSchema.pre('save', async function (next) {
    try {
        if (this.method !== 'local') {
            next();
        }
        // Generate Salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hashed (salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        // Re-assign hashed password, over original plain text password
        this.local.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}

/*
* Create and export a model
*
* */
module.exports = User = mongoose.model('User', UserSchema);
