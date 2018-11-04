/*
* NPM Depedencies
*
* */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

/*
* Import User Model
*
* */
const User = require('../modules/users/User');

/*
* Import config
*
* */
const config = require('../config/constants');

/*
* Json Web Token Strategy
*
* */
// JWT Options
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('authorization'),
    secretOrKey: config.JWT_SECRET,
};
// JWT Strategy
const jwtStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
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
});

/*
* Local Strategy
*
* */
// Local Options
const localOpts = {
    usernameField: 'email'
};
// Local Strategy
const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
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
});

/*
* Google Strategy
*
* */
// Google Options
const googleOpts = {
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret,
};
// Google Strategy
const googleStrategy = new GoogleStrategy(googleOpts, async (accessToken, refreshToken, profile, done) => {
    try {
        // Should have full user profile over here
        console.log('profile: ', profile);
        console.log('accessToken: ', accessToken);
        console.log('refreshToken: ', refreshToken);
        // Check whether this current user exist in our DB
        const existingUser = await User.findOne({'google.id': profile.id});
        if (existingUser) {
            return done(null, existingUser);
        }
        // If new account
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value,
            },
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
});

/*
* Google Strategy
*
* */
// Google Options
const facebookOpts = {
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret,
};
// Google Strategy
const facebookStrategy = new FacebookStrategy(facebookOpts, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        const existingUser = await User.findOne({'facebook.id': profile.id});
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value,
            },
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
});

passport.use(jwtStrategy);
passport.use(localStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);


module.exports = {
    authJwt: passport.authenticate('jwt', {session: false}),
    authLocal: passport.authenticate('local', {session: false}),
    authGoogle: passport.authenticate('google', {session: false}),
    authFacebook: passport.authenticate('facebook', {session: false})
};
