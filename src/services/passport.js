/*
* NPM Depedencies
*
* */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

/*
* Import JWT_SECRET
*
* */
const {JWT_SECRET} = require('../config/constants');

/*
* Json Web Token Strategy
*
* */
// JWT Options
const jwtOps = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
    secretOrKey: JWT_SECRET,
};
// JWT Strategy
passport.use(new JwtStrategy(jwtOps, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

/*
* Local Strategy
*
* */
// Local Options

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({'local.email': email});

        // If not, handle it
        if (!user) {
            return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));
