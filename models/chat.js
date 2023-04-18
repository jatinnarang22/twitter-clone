const mongoose = require("mongoose");

let postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
  }
);
let Chat = mongoose.model("Chat", postSchema);
module.exports = Chat;
