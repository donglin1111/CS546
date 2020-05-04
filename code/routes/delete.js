const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');
//const userData = data.users;

router.get('/', async(req, res) => {

        res.render('posts/usedcars');
        res.render('post/newcars')
    
});

 router.get('/delete/:id', async (req,res) => {
    if(req.session.carId){
        const carInfo2 = await cars.getCarById(req.session.carId);
        // const carInfo = await cars.removeOneCar(req.session.carId)
        // console.log(carInfo);
        res.render('posts/delete',{ title:"delete",carInfo2});
    }else{
        res.redirect('/');
    }
 })

module.exports = router;