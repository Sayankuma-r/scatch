const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const db = require("./config/mongoose-connection");
const userModel = require("./models/user-model");


// Import routers
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");
const Product = require("./models/product-model");
const { isLoggedIn } = require("./middlewares/isLoggedin");

const flash = require("connect-flash");
const session = require("express-session");

require("dotenv").config();

// Middleware

app.use(
    session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(flash());
app.use(function(req, res, next) {

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    next();

});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(async function(req, res, next) {
    res.locals.loggedin = false;
    res.locals.currentUser = null;

    if (req.cookies && req.cookies.token) {
        try {
            const payload = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            const user = await userModel.findOne({ email: payload.email }).select("-password");

            if (user) {
                req.user = user;
                res.locals.loggedin = true;
                res.locals.currentUser = user;
            }
        } catch (err) {
            res.locals.loggedin = false;
        }
    }

    next();
});

app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");

// Routes
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

// Other Pages


app.get("/cart", (req, res) => {
    res.render("cart");
});

app.get("/owners/login", (req, res) => {
    res.render("owner-login");
});

app.get("/admin", (req, res) => {
    res.render("admin");
});

app.get("/products/create", (req, res) => {
    const imagesPath = path.join(__dirname, "public", "images");
    let designImages = [];

    try {
        designImages = fs.readdirSync(imagesPath).filter((file) => {
            return /\.(jpe?g|png|gif|webp)$/i.test(file);
        });
    } catch (err) {
        console.error("Unable to read design images:", err);
    }

    res.render("createproduct", { designImages });
});

// Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});