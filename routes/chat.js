const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { upload } = require("../index");

// console.log(upload);

const Chat = require("../models/chats");
const User = require("../models/user");
const { Cookie } = require("express-session");

router.get("/chat", async (req, res) => {
  if (!req.isAuthenticated) return res.redirect("/signin");
  let chat = await Chat.find({}).populate("user");
  // console.log(req.cookies.user_id);
  let user = await User.findById(req.cookies.user_id);
  // console.log(user.populate("chats"));
  // console.log(await User.find)
  res.render("product/chat", { chat, user });
});

router.post("/chat", upload.single("filename"), async (req, res) => {
  if (!req.isAuthenticated) return res.redirect("/signin");
  let { text, filename } = req.body;
  // console.log(req.cookies);
  console.log(filename);
  // console.log(req.file);

  const { user_id } = req.cookies;
  let _id;
  if (req.file === undefined) {
    _id = await Chat.create({
      // chatimg: req.file.filename,
      content: text,
      user: user_id,
    });
  } else {
    _id = await Chat.create({
      chatimg: req.file.filename,
      content: text,
      user: user_id,
    });
  }
  const ress = await User.findByIdAndUpdate(user_id, { $push: { chats: _id } });
  // console.log(ress);
  res.redirect("/chat");
});
module.exports = router;
