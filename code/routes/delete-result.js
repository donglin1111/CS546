const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');

router.post('/', async (req,res) => {
    
    let id = req.body['deid'];

    
    if(!id){
		res.status(400).render('posts/error', {
			title: 'Error 400',
			description: 'You must enter id before submitting！'
		});
		return;
    }else{
        const IsDelete = true;
        try {
            var deletecar = await cars.removeOneCar(id)
            IsDelete = true;
        } catch (error) {
            IsDelete = false;
        }
		
		res.render('posts/delete-result', {
			title: 'Delete result',
			id: id,
            IsDelete: IsDelete,
            deletecar: deletecar,
			class: IsDelete? "success" : "failure"
		});
    } 
 })

 module.exports = router;