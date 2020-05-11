const express = require("express");
const router = express.Router();
const data = require("./users");
// const data = require("../data");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
    if (req.session.user) {
        console.log("asdf")
        res.redirect("login/private");
    } else {
        res.render("posts/login", { user: req.session.user });
    }
});

router.post('/', async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(401).render("post/login", { error: true, info: "You must enter username or password" });
        return;
    }
    let exists = false;
    let theuser;
    for (let i = 0; i < data.length; i++) {
        if (Object.values(data[i]).includes(username)) {
            exists = true;
            theuser = data[i];
            break;
        }
    }
    if (theuser != undefined && bcrypt.compareSync(password, theuser.hashedPassword)) {
        req.session.user = theuser;
        res.redirect("login/private");
    } else {
        console.log("error")
        res.status(401).render("posts/login", { error: true, info: "The username or password was incorrect" });
    }

});

router.get("/private", (req, res) => {
    if (req.session.user) {
        res.render("login/private", { user: req.session.user });
    } else {
        res.render("login/error");
    }
});

router.get('/logout', async(req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;