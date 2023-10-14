const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

const MonogoStore = require("connect-mongo");
const app = express();

const dbString = process.env.DB_STRING;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = MonogoStore.create({
  mongoUrl: dbString,
});


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res, next) => {
  if(req.session.viewCount){
    req.session.viewCount++
  } else {
    req.session.viewCount = 1
  }

  res.status(200).send("<h1>hello worled (sessions)</h1> \n <p>view count: " + req.session.viewCount + "</p>");
});

app.listen(3000, () => {
  console.log("application lisiting on port 3000 ");
});
