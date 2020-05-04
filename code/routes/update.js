const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');
//const userData = data.users;

router.get('/', async(req, res) => {

        res.render('posts/usedcars');
        res.render('post/newcars')
    
});

 router.get('/update/:id', async (req,res) => {
    if(req.session.carId){
        const carInfo2 = await cars.getCarById(req.session.carId);
        const carInfo = await cars.updateCar(req.session.carId)
        // console.log(carInfo);
        res.render('posts/update',{ title:"update",carInfo2});
    }else{
        res.redirect('/');
    }
 })

module.exports = router;