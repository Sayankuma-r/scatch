const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");

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

        let image = req.file ? req.file.buffer : null;
        if (!image && req.body.selectedDesign) {
            const imageName = path.basename(req.body.selectedDesign);
            const imagePath = path.join(__dirname, "..", "public", "images", imageName);
            const imageDirectory = path.dirname(imagePath);
            const allowedImages = await fs.readdir(imageDirectory);

            if (!allowedImages.includes(imageName)) {
                req.flash("error", "Selected design was not found");
                return res.redirect("/products/create");
            }

            image = await fs.readFile(imagePath);
        }

        await Product.create({
            image,
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