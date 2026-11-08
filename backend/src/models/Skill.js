const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Skill ka naam zaroori hai"], trim: true },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "Tools", "Other"],
      default: "Frontend",
    },
    icon: {
      url: String,
      public_id: String,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
