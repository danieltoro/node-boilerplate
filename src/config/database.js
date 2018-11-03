
/*
* NPM Dependencies
*
* */
const mongoose = require('mongoose');
const chalk = require('chalk');

/*
* Import Keys
*
* */
const {MONGO_URL} = require('./constants');

/*
*  Remove the warning with promise
*
* */
mongoose.Promise = global.Promise;

/*
* Connect the Database with the url provided
*
* */
try {
    mongoose.connect(MONGO_URL, {useCreateIndex: true, useNewUrlParser: true});
} catch (err) {
    mongoose.createConnection(MONGO_URL);
}

/*
*  Log for Connection with Database
*
*  */
mongoose.connection
    .once('open', () =>
        console.log(chalk.green.bold(
            `MongoDB is Running 🍃🍃🍃`
        )),
    )
    .on('error', error =>
        console.log(chalk.red(
            `Cannot run database! 😱
            ---
            Error: ${error}`
        )),
    );
