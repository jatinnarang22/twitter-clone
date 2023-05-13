const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      trim: true,
      default: '/dummy.jpg',
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let User = mongoose.model("User", userSchema);
module.exports = User;
