const homepageRoutes = require('./homepage');
const userRoutes = require('./users');
const path = require('path');

const constructorMethod = (app) => {
    app.use('/homepage', homepageRoutes);
    app.use('/users', userRoutes);
    app.get('/about', (req, res) => {
        res.sendFile(path.resolve('static/about.html'));
    });

    app.use('*', (req, res) => {
        res.redirect('/homepage');
    });
};

module.exports = constructorMethod;