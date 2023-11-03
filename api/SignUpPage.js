const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://bargainbasket:bargainbasket123@bargainbasketcluster.gq7cemq.mongodb.net/BargainBasketDB");

const usersSchema = {
    email: String,
    username: String,
    password: String
}

const User = mongoose.model("User", usersSchema);


export default async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).end("Method Not Allowed");
    }

    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    newUser.save();

    const { email, username, password } = req.body;

    try {

        newUser.save();

        res.writeHead(302, { Location: "/Pages/HomePage.html" });
        res.end();

    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
};