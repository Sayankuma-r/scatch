const express = require("express");
const router = express.Router();

const Product = require("../models/product-model");
const upload = require("../config/multer-config");

// GET ALL PRODUCTS

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.render("shop", {
            products
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching products");
    }
});

// CREATE PRODUCT

router.post("/create", upload.single("image"), async (req, res) => {
    try {

        const {
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        } = req.body;

        await Product.create({
            image: req.file ? req.file.buffer : null,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });

        req.flash("success", "Product created successfully");

        res.redirect("/shop");

    } catch (err) {

        console.log(err);

        req.flash("error", "Error creating product");

        res.status(500).send(err.message);
    }
});

module.exports = router;