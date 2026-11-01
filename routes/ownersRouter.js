const express = require('express');
const router = express.Router();

const ownerModel = require("../models/owner-model");
const Product = require("../models/product-model");

if (process.env.NODE_ENV === "development") {

    router.post("/create", async function (req, res) {

        let owners = await ownerModel.find();

        if (owners.length > 0) {
            return res
                .status(403)
                .send("You dont have permission to create a new owner");
        }

        let { fullname, email, password } = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });

        res.status(201).send(createdOwner);

    });

}

router.get("/admin", async function (req, res) {
  try {
    const products = await Product.find();
    res.render("admin", {
      products,
      success: req.flash("success"),
      error: req.flash("error")
    });
  } catch (err) {
    console.error("Unable to load owner catalog:", err);
    res.status(500).send("Error loading owner catalog");
  }
});

module.exports = router;