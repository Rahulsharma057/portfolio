const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Naam zaroori hai"], trim: true },
    email: {
      type: String,
      required: [true, "Email zaroori hai"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email sahi nahi lag raha"],
    },
    phone: { type: String, default: "" },
    subject: { type: String, default: "" },
    message: { type: String, required: [true, "Message zaroori hai"] },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
