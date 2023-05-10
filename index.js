const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const User = require("./models/user.js");
let methodOverride = require("method-override");

//multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
exports.upload = upload;
// app.use(upload);
// let revRoutes = require("./routes/review");

// app.use(cookieParser);
// app.use(methodOverride("_method"));

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); //static files
app.use(express.static(path.join(__dirname, "upload")));
app.use(cookieParser());
app.use(async (req, res, next) => {
  console.log(true);
  const { user_id } = req.cookies;
  if (user_id) {
    try {
      const user = await User.findById(user_id);
      if (user) req.isAuthenticated = true;
    } catch (err) {}
  }
  next();
});
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
let user = require("./routes/user");
//Middle express
app.use(chat);
app.use(user);

const port = 3000;
app.listen(port, async () => {
  console.log(`server connected at port ${port}`);
  mongoose.set("strictQuery", true);
  await mongoose
    .connect("mongodb://127.0.0.1:27017/twitterclone")
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);
    });
});
