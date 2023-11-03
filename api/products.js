const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Pages', 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

mongoose.connect("mongodb+srv://bargainbasket:bargainbasket123@bargainbasketcluster.gq7cemq.mongodb.net/BargainBasketDB");

const usersSchema = {
    email: String,
    username: String,
    password: String
}

const User = mongoose.model("User", usersSchema);


app.get('/login', (req, res) => {
    if (req.method !== "GET") {
        res.status(405).end("Method Not Allowed");
    }

    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 12;

    const skip = (page - 1) * productsPerPage;
    const products = Product.find({}).skip(skip).limit(productsPerPage);

    const totalProducts = Product.countDocuments();
    const hasNextPage = skip + products.length < totalProducts;

    try {

        res.render('/products', {
            productsList: products,
            currentPage: page,
            hasNextPage: hasNextPage
        });

        res.end();

    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
});
