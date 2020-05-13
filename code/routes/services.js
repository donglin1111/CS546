const express = require('express');
const router = express.Router();
const data = require('../data');
const carData = data.cars;

router.get('/', async(req, res) => {
    res.render('posts/service',{title:"service"});

});


module.exports = router;