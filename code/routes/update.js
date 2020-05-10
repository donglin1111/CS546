const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');
//const userData = data.users;

router.get('/', async(req, res) => {

        res.render('posts/update');
        res.render('posts/update-result')
    
});

router.get('/update', (req, res) => {
	res.render('posts/update', {title: 'Update'});
});

router.post('/update-result', async (req,res) => {
    let id = req.body['id'];
    
    let VIN = req.body['VIN'];
    let Brand = req.body['Brand'];
    let Model = req.body['Model'];
    let VehicleType = req.body['VehicleType'];
    let Timetomarket = req.body['Timetomarket'];
    let Color = req.body['Color'];

    const bodypart={
        VIN:VIN,
        Brand:Brand,
        Model:Model,
        VehicleType:VehicleType,
        Timetomarket:Timetomarket,
        Color:Color
    }
    
    if(!id){
		res.status(400).render('posts/error', {
			title: 'Error 400',
			description: 'You must enter text before submitting！'
		});
		return;
    }else{
        const IsUpdate = true;
        try {
            var newcar = await cars.updateCar(id,bodypart)
            IsUpdate = true;
        } catch (error) {
            IsUpdate = false;
        }
		
		res.render('posts/update-result', {
			title: 'Update result',
			id: id,
            IsUpdate: IsUpdate,
            newcar: newcar,
			class: IsUpdate? "success" : "failure"
		});
    } 
 })

module.exports = router;