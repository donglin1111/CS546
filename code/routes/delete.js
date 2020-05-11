const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');
//const userData = data.users;



router.get('/', (req, res) => {
	res.render('posts/delete', {title: 'Delete'});
});



module.exports = router;