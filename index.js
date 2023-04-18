const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
let user = require("./routes/user");
const session = require("express-session");
const cookieParser=require("cookie-parser");

// let revRoutes = require("./routes/review");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/twitterclone")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
  // app.use(cookieParser);
// app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); //static files
app.use(cookieParser());

// const sessionConfig = {
//   secret: 'weneedsomebettersecret',
//   resave: false,
//   saveUninitialized: true,
//   cookie:{
//       httpOnly:true,
//       expires:Date.now() + 1000*60*60*24*7,
//       maxAge: 1000*60*60*24*7
//   }
// }

// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(user.serializeUser());
// passport.deserializeUser(user.deserializeUser());

// passport.use(new LocalStrategy(user.authenticate()));

// Routes require
let chat = require("./routes/chat");

//Middle express
app.use(chat);
app.use(user);

const port = 3000;
app.listen(port, () => {
  console.log(`server connected at port ${port}`);
});
