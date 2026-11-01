const express = require("express");
const router = express.Router();

const userModel = require("../models/user-model");
const productModel = require("../models/product-model");

const { isLoggedIn } = require("../middlewares/isLoggedin");

// Home Page

router.get("/", (req, res) => {

    let error = req.flash("error");
    let success = req.flash("success");

    res.render("index", { error, success });

});

// Shop Page

router.get("/shop", isLoggedIn, async (req, res) => {

    try {

        let products = await productModel.find();
        let success = req.flash("success");

        res.render("shop", {
            products,
            success
        });

    } catch (err) {

        console.log(err);
        res.status(500).send("Error loading shop");

    }

});

// Add To Cart

router.get("/addtocart/:productId", isLoggedIn, async (req, res) => {

    try {

        let user = await userModel.findOne({
            email: req.user.email
        });

        if (!user) {

            req.flash("error", "User not found");
            return res.redirect("/shop");

        }

        user.cart.push(req.params.productId);

        await user.save();

        req.flash("success", "Product added to cart");

        res.redirect("/shop");

    } catch (err) {

        console.log(err);
        req.flash("error", "Unable to add product");

        res.redirect("/shop");

    }

});

// Remove From Cart

router.post("/removefromcart/:productId", isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/cart");
        }

        const itemIndex = user.cart.findIndex((item) => item.toString() === req.params.productId);
        if (itemIndex === -1) {
            req.flash("error", "Product is not in your bag");
            return res.redirect("/cart");
        }

        user.cart.splice(itemIndex, 1);
        await user.save();
        res.redirect("/cart");
    } catch (err) {
        console.error("Unable to remove product from cart:", err);
        req.flash("error", "Unable to update your bag");
        res.redirect("/cart");
    }
});

// Cart Page

router.get("/cart", isLoggedIn, async (req, res) => {

    try {

        let user = await userModel
            .findOne({ email: req.user.email })
            .populate("cart");

        if (!user) {
            return res.redirect("/");
        }

        const cartItems = Array.isArray(user.cart) ? user.cart : [];
        const cartTotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
        const discountTotal = cartItems.reduce((sum, item) => sum + (item.discount || 0), 0);
        const platformFee = cartItems.length > 0 ? 20 : 0;
        const bill = cartTotal - discountTotal + platformFee;

        res.render("cart", {
            user,
            cartItems,
            cartTotal,
            discountTotal,
            platformFee,
            bill,
            success: req.flash("success"),
            error: req.flash("error")
        });

    } catch (err) {

        console.log(err);
        res.status(500).send("Error loading cart");

    }

});

// Account Page

router.get("/account", isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email }).select("fullname email contact orders cart");

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/");
        }

        res.render("account", {
            user
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading account");
    }
});

// Logout

router.get("/logout", (req, res) => {

    res.clearCookie("token");

    req.flash("success", "Logged out successfully");

    res.redirect("/");

});

module.exports = router;