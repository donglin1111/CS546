const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');
//const userData = data.users;

router.get('/', async(req, res) => {

        res.render('posts/delete');
        res.render('posts/delete-result')
    
});

router.get('/delete', (req, res) => {
	res.render('posts/delete', {title: 'Delete'});
});

router.post('/delete-result', async (req,res) => {
    
    let VIN = req.body['VIN'];

    
    if(!VIN){
		res.status(400).render('posts/error', {
			title: 'Error 400',
			description: 'You must enter VIN before submitting！'
		});
		return;
    }else{
        const IsDelete = true;
        try {
            var deletecar = await cars.removeOneCar(VIN)
            IsDelete = true;
        } catch (error) {
            IsDelete = false;
        }
		
		res.render('posts/delete-result', {
			title: 'Delete result',
			VIN: VIN,
            IsDelete: IsDelete,
            deletecar: deletecar,
			class: IsDelete? "success" : "failure"
		});
    } 
 })

module.exports = router;