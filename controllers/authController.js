const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generatetoken");

// Register User
module.exports.registerUser = async function(req, res) {

    try {

        let { email, password, fullname } = req.body;

        // Check if user already exists
        let existingUser = await userModel.findOne({ email });

        if (existingUser) {

            req.flash("error", "User already exists");
            return res.redirect("/");

        }

        // Generate Salt
        bcrypt.genSalt(10, function(err, salt) {

            if (err) return res.send(err.message);

            // Hash Password
            bcrypt.hash(password, salt, async function(err, hash) {

                if (err) return res.send(err.message);

                // Create User
                let user = await userModel.create({
                    email,
                    password: hash,
                    fullname
                });

                // Generate Token
                let token = generateToken(user);

                // Save Token in Cookie
                res.cookie("token", token);

                req.flash("success", "User registered successfully");

                res.redirect("/shop");

            });

        });

    } catch(err) {

        console.log(err.message);
        res.send(err.message);

    }

};

// Login User
module.exports.loginUser = async function(req, res) {

    let { email, password } = req.body;

    // Find User
    let user = await userModel.findOne({ email: email });

    if (!user) {

        req.flash("error", "Email or password incorrect");

        return res.redirect("/");

    }

    // Compare Password
    bcrypt.compare(password, user.password, function(err, result) {

        if (result) {

            let token = generateToken(user);

            res.cookie("token", token);

            req.flash("success", "Login successful");

            res.redirect("/shop");

        } else {

            req.flash("error", "Email or password incorrect");

            res.redirect("/");

        }

    });

};

// Logout User
module.exports.logoutUser = function(req, res) {

    res.clearCookie("token");

    req.flash("success", "Logged out successfully");

    res.redirect("/");

};