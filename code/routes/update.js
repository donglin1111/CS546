const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');
//const userData = data.users;

router.get('/', async(req, res) => {
        res.render('posts/update');
    
});

 router.post('/', async (req,res) => {
    if(req.body){
        let body = req.body;
        cars.addCars(body);
        res.redirect('/');
        // console.log(carInfo);
    }else{
        res.redirect('/');
    }
 })

module.exports = router;