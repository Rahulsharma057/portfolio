const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: [true, "Role zaroori hai"], trim: true },
    company: { type: String, required: [true, "Company zaroori hai"], trim: true },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Freelance", "Contract"],
      default: "Full-time",
    },
    location: { type: String, default: "" },
    startDate: { type: Date, required: [true, "Start date zaroori hai"] },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    points: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 },

    // { hi: { role, location, points: [...] }, hinglish: {...} }
    translations: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
