const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');

router.post('/', async(req, res) => {
    let id = req.body['upid'];

    let VIN = req.body['upVIN'];
    let Brand = req.body['upBrand'];
    let Model = req.body['upModel'];
    let VehicleType = req.body['upVehicleType'];
    let Timetomarket = req.body['upTimetomarket'];
    let Color = req.body['upColor'];

    const bodypart = {
        VIN: VIN,
        Brand: Brand,
        Model: Model,
        VehicleType: VehicleType,
        Timetomarket: Timetomarket,
        Color: Color
    }
    console.log(bodypart)
    if (!id) {
        res.status(400).render('posts/error', {
            title: 'Error 400',
            description: 'You must enter text before submitting！'
        });
        return;
    } else {
        const IsUpdate = true;
        try {
            var newcar = await cars.updateCar(id, bodypart)
            IsUpdate = true;
        } catch (error) {
            IsUpdate = false;
        }

        res.render('posts/update-result', {
            title: 'Update result',
            id: id,
            IsUpdate: IsUpdate,
            newcar: newcar,
            class: IsUpdate ? "success" : "failure"
        });
    }
})

module.exports = router;