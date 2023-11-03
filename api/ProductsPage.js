const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/Pages'));

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


export default async (req, res) => {

    try {

        res.render('ProductsPage');

        res.end();

    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
};
