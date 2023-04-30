const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chatimg:{
    type:String,
    trim:true,
  },
  img: {
    type: String,
    trim: true,
    default: "/images/dummy.jpg",
  },
  content: {
    type: String,
    require: true,
  },
});

let Chats = mongoose.model("Chats", userSchema);
module.exports = Chats;
