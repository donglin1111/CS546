const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;
//const userData = data.users;

router.get('/', async(req, res) => {
    let postList = await postData.getAllPosts();
    res.render('posts/offers', { offers: postList });
});

module.exports = router;