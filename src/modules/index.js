/*
*** API Routes file ***
*/
const userRoutes = require('./users/userApi');
const postRoutes = require('./posts/postApi');

module.exports = app => {
    app.use('/api/user', userRoutes);
    app.use('/api/post', postRoutes);
};
