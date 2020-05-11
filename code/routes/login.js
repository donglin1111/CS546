const express = require("express");
const router = express.Router();
const data = require('../data');
const userData = data.users;
const carData = data.cars;
const postData = data.posts;
const cars = require('../data/cars');
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("login/private");
    } else {
        res.render("posts/login", { user: req.session.user });
    }
});

router.post('/', async(req, res) => {
    let userList = await userData.getAllUsers();
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(401).render("post/login", { error: true, info: "You must enter username or password" });
        return;
    }
    let exists = false;
    let theuser;
    for (let i = 0; i < userList.length; i++) {
        if (Object.values(userList[i]).includes(username)) {
            exists = true;
            theuser = userList[i];
            break;
        }
    }
    if (theuser != undefined && bcrypt.compareSync(password, theuser.hashedpassword)) {
        req.session.user = theuser;
        res.redirect("login/private");
    } else {
        res.status(401).render("posts/login", { error: true, info: "The username or password was incorrect" });
    }

});

router.get("/private", async(req, res) => {
    const carList = await carData.getAllCar();
    if (req.session.user) {
        res.render("login/private", { user: req.session.user, cars: carList });
    } else {
        res.render("login/error");
    }
});

router.get("/addcar", async(req, res) => {
    const carList = await carData.getAllCar();
    if (req.session.user) {
        res.render("login/addcar", { user: req.session.user, cars: carList });
    } else {
        res.render("login/error");
    }
});

router.get("/allcars", async(req, res) => {
    const carList = await carData.getAllCar();
    if (req.session.user) {
        res.render("login/allcars", { user: req.session.user, cars: carList });
    } else {
        res.render("login/error");
    }
});

router.post('/addcar', async(req, res) => {
    if (req.body) {
        let body = req.body;
        console.log("carInfo");
        cars.addCars(body);
        res.redirect('/login');
        // console.log(carInfo);
    } else {
        res.redirect('/');
    }
});

router.get("/addoffer", (req, res) => {
    if (req.session.user) {
        res.render("login/addoffer", { user: req.session.user });
    } else {
        res.render("login/error");
    }
});

router.post("/addoffer", async(req, res) => {
    let blogPostData = req.body;
    let errors = [];

    if (!blogPostData.title) {
        errors.push('No title provided');
    }

    if (!blogPostData.body) {
        errors.push('No body provided');
    }
    if (errors.length > 0) {
        res.render('login/addoffer', {
            errors: errors,
            hasErrors: true,
            post: blogPostData
        });
        return;
    }
    try {
        const newPost = await postData.addPost(
            blogPostData.title,
            blogPostData.body,
        );
        res.redirect('/login');
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/logout', async(req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;