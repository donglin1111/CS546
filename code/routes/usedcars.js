const express = require('express');
const router = express.Router();
const data = require('../data');
const carData = data.cars;

router.get('/', async(req, res) => {
    let carList = await carData.getAllCar();
    res.render('posts/usedcars', { cars: carList });

});

router.get('/used-cars', async(req, res) => {
    // if(req.session.carId){
    const carInfo = await cars.getAllCarById();
    for (i = 0; i < carInfo.length; i++) {
        const ID = carInfo[i].VIN
        const CARs = await cars.getCarById(ID)
        const info = {
            VIN: cars.VIN,
            Brand: CARs.Brand,
            Model: CARs.Model,
            URL: "/used-cars/" + ID,
        }

        carInfo[i] = info;
    }
    // console.log(carInfo);
    req.session.carId = carInfo.VIN;
    res.render('posts/usedcars', { title: "usedcars", carInfo });
    // }else{
    //     res.render('posts/usedcars',{ title:"usedcars"});;
    // }
})

router.get('/used-cars/:id', async(req, res) => {
    if (req.session.carId) {
        const carInfo2 = await cars.getCarById(req.session.carId);
        // console.log(carInfo);
        res.render('posts/usedcarsbyid', { title: "usedcars", carInfo2 });
    } else {
        res.redirect('/used-cars')
    }
});
router.post('/', async (req, res) => {
    const carlist = await data.cars.SearchCar(req.body.search);
    res.render('posts/searchresult', { cars: carlist });
});
module.exports = router;