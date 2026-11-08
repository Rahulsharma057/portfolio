const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: [true, "Degree zaroori hai"], trim: true },
    field: { type: String, default: "" },
    institution: { type: String, required: [true, "Institution zaroori hai"], trim: true },
    startYear: { type: Number },
    endYear: { type: Number },
    grade: { type: String, default: "" },
    points: { type: [String], default: [] },
    order: { type: Number, default: 0 },

    // { hi: { degree, field, points: [...] }, hinglish: {...} }
    translations: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Education", educationSchema);
