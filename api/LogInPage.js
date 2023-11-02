const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');

app.use(bodyParser.urlencoded({extended: true}));

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

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      // Successful login
      // You can set cookies or session variables here if needed

      res.writeHead(302, { Location: "/Pages/HomePage.html" });
      res.end();
    } else {
      // Failed login
      res.writeHead(302, { Location: "/?error=authFailed" });
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("Internal Server Error");
  }
};

