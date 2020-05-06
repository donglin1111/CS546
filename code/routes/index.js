const homepageRoutes = require('./homepage');
const newcarsRoutes = require('./newcars');
const usedcarsRoutes = require('./usedcars');
const offersRoutes = require('./offers');
const servicesRoutes = require('./services');
const loginRoutes = require("./login");
const updateRoutes = require("./update");
const path = require('path');

const constructorMethod = (app) => {
    app.use('/homepage', homepageRoutes);
    app.use('/newcars', newcarsRoutes);
    app.use('/usedcars', usedcarsRoutes);
    app.use('/offers', offersRoutes);
    app.use('/services', servicesRoutes);
    app.use('/login', loginRoutes);
    app.use('/update', updateRoutes);
    app.use('*', (req, res) => {
        res.redirect('/homepage');
    });
};

module.exports = constructorMethod;