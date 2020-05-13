const express = require('express');
const router = express.Router();
const data = require('../data');
const carData = data.cars;

router.get('/:id', async(req, res) => {
    try {
        const car = await carData.getCarById(req.params.id);
        res.render('posts/singlecar', { car: car });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;