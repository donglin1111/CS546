const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;
//const userData = data.users;

router.get('/', async(req, res) => {
    let postList = await postData.getAllPosts();
    res.render('posts/offers', { offers: postList });
});
router.post('/', async (req, res) => {
    const carlist = await data.cars.SearchCar(req.body.search);
    res.render('posts/searchresult', { cars: carlist });
});
module.exports = router;