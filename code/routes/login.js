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

// router.get('/:id', async(req, res) => {
//     if (req.session.user) {
//         try {
//             const car = await carData.getCarById(req.params.id);
//             res.render('login/addedcar', { car: car });
//         } catch (e) {
//             res.status(500).json({ error: e });
//         }
//     } else {
//         res.render("login/error");
//     }
// });

router.get("/private", async(req, res) => {
    const carList = await carData.getAllCar();
    const offerList = await postData.getAllPosts();
    let total = carList.length;
    let totaloffer = offerList.length;
    let Number_newcar = 0;
    let Number_usedcar = 0;
    for (let i = 0; i < total; i++) {
        if (carList[i].Usedcar) {
            Number_usedcar++;
        } else {
            Number_newcar++;
        }
    }
    if (req.session.user) {
        res.render("login/private", {
            user: req.session.user,
            cars: carList,
            total: total,
            Number_newcar: Number_newcar,
            Number_usedcar: Number_usedcar,
            totaloffer: totaloffer
        });
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


router.get("/addedcar", async(req, res) => {
    if (req.session.user) {
        res.render("login/addedcars", { user: req.session.user, cars: carList });
    } else {
        res.render("login/error");
    }
});

router.post('/addcar', async(req, res) => {
    let carData = req.body;
    let errors = [];
    if (!carData.VIN) {
        errors.push('No VIN provided');
    }
    if (!carData.Brand) {
        errors.push('No Brand provided');
    }
    if (!carData.Model) {
        errors.push('No Model provided');
    }
    if (!carData.VehicleType) {
        errors.push('No VehicleType provided');
    }
    if (!carData.Timetomarket) {
        errors.push('No Timetomarket provided');
    }
    if (!carData.Years) {
        errors.push('No Years provided');
    }
    if (!carData.Usedcar) {
        errors.push('No Usedcar provided');
    }
    if (!carData.Exterior) {
        errors.push('No Exterior provided');
    }
    if (!carData.Interior) {
        errors.push('No Interior provided');
    }
    if (!carData.Style) {
        errors.push('No Style provided');
    }
    if (!carData.Price) {
        errors.push('No Price provided');
    }
    if (!carData.Mileage) {
        errors.push('No Mileage provided');
    }
    if (!carData.img) {
        errors.push('No img provided');
    }
    if (errors.length > 0) {
        res.render('login/addcar', {
            errors: errors,
            hasErrors: true,
            post: carData
        });
        return;
    }
    carData.Usedcar = (carData.Usedcar == 'true');
    try {
        const newcar = await cars.addCars(carData);
        res.redirect(`/newcars/${newcar._id}`);
        // res.redirect('/login/addedcar/${newcar._id}');
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get("/addoffer", (req, res) => {
    console.log("1")
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
        console.log("2")
        res.status(500).json({ error: e });
    }
});

router.get('/delete', async (req, res) => {
    if (req.session.user) {
        const carList = await carData.getAllCar();
        res.render('login/delete', { title: 'Delete', cars: carList });
    }else{
        res.render("login/error");
    }
});
router.post('/delete', async (req, res) => {
    const bool = await cars.removeOneCar(req.body.id);
    res.render('login/delete-result', { title: 'Delete result', IsDelete: bool, id: req.body.id });
});

router.get('/logout', async(req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;