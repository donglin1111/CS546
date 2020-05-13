const express = require('express');
const router = express.Router();
const data = require('../data');
const carData = data.cars;

router.get('/', async(req, res) => {
    let carList = await carData.getAllCar();
    res.render('posts/usedcars', { cars: carList });

});

router.get('/:id', async(req, res) => {
    try {
        const carInfo = await carData.getCarById(req.params.id);
        res.render('posts/singlecar2', { car: carInfo });
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

module.exports = router;