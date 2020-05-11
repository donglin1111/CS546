const express = require("express");
const router = express.Router();
const user = require("../data/User");
// const data = require("../data");
router.get("/", (req, res) => {
    res.render("posts/create");
});
router.post("/", (req, res) => {
    user.addUser(req.body);
    res.redirect("/login");
});
module.exports = router;
