const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/authController");

router.get("/", function(req, res) {
    res.send("Users route working");
});

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Logout Route
router.get("/logout", logoutUser);

module.exports = router;