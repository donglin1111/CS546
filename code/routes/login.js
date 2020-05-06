const express = require("express");
const router = express.Router();
// const data = require("../data");
// const bcrypt = require("bcryptjs");

router.get("/", async(req, res) => {
    // if (req.session.user)
    //     // res.redirect("/private");
    //     res.redirect("/private");
    // else
    res.render("posts/login");
});

// router.post("/login", (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//         res.status(401).render("login/login", { title: "Login", error: true, info: "You must enter username or password" });
//         return;
//     }
//     let exists = false;
//     let theuser;
//     for (let i = 0; i < data.length; i++) {
//         if (Object.values(data[i]).includes(username)) {
//             exists = true;
//             theuser = data[i];
//             break;
//         }
//     }
//     if (theuser != undefined && bcrypt.compareSync(password, theuser.hashedPassword)) {
//         req.session.user = theuser;
//         res.redirect("/private");
//     } else {
//         res.status(401).render("login/login", { title: "Login", error: true, info: "The username or password was incorrect" });
//     }
// });

// router.get("/logout", (req, res) => {
//     req.session.destroy();
//     res.redirect("/");
// });
// router.get("/private", (req, res) => {
//     if (req.session.user) {
//         res.render("login/private", { title: "User Info", user: req.session.user });
//     } else {
//         res.render("login/private", { hasErrors: true, title: "Error" });
//     }
// });
module.exports = router;