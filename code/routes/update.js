const express = require('express');
const router = express.Router();
const cars = require('../data/Cars');
//const userData = data.users;

// router.get('/', async(req, res) => {

//     res.render('posts/update');
//     res.render('posts/update-result')

// });

router.get('/', (req, res) => {
    res.render('posts/update', { title: 'Update' });
});



module.exports = router;