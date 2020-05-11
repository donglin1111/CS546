const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');
router.get('/', async(req, res) => {
    allcar = await cars.getAllCar(req.session.user);
    res.render('posts/allcars', {allcar:allcar});
});
module.exports = router;