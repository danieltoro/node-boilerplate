
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
const db = require('./constants');

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
    mongoose.connect(db.MONGO_URL, {useNewUrlParser: true});
} catch (err) {
    mongoose.createConnection(db.MONGO_URL);
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
