let express = require("express");
const Chat = require("../models/chat");
const router = express.Router();

router.get("/Chat", async (req, res) => {
  let chat = await Chat.find({});
  res.render("product/chat", { chat });
});

router.post("/chat", async (req, res) => {
  let { text } = req.body;
  await Chat.create({content:text});
  res.redirect("/chat");
});
module.exports = router;
