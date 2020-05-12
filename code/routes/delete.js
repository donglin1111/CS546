const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');
//const userData = data.users;



router.get('/', (req, res) => {
	res.render('posts/delete', {title: 'Delete'});
});
router.post('/', (req, res) => {
	cars.removeOneCar()
	res.render('posts/delete-result', {title: 'Delete result'});
});


module.exports = router;