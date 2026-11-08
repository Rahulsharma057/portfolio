const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  { url: String, public_id: String },
  { _id: false }
);

// Image ka focal point - percentage me. Isse decide hota hai ki image crop
// hone par uska kaunsa hissa dikhega. Desktop aur mobile ke liye alag,
// kyunki mobile par frame tall hota hai aur image ka zyada hissa kat jata hai.
const focusSchema = new mongoose.Schema(
  {
    x: { type: Number, default: 50, min: 0, max: 100 },
    y: { type: Number, default: 50, min: 0, max: 100 },
  },
  { _id: false }
);

// About section me chhote expandable points.
// Band rehte hain, click karne par khulte hain - isse section chhota rehta hai
// lekin jisko padhna hai woh detail padh sakta hai.
const highlightSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, default: "" },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: "Rahul Sharma" },
    title: { type: String, default: "Frontend Developer | MERN Stack" },
    tagline: { type: String, default: "" },
    shortBio: { type: String, default: "" },
    longBio: { type: String, default: "" },

    aboutHighlights: { type: [highlightSchema], default: [] },

    heroBgImage: { type: imageSchema, default: {} },
    profileImage: { type: imageSchema, default: {} },

    // Hero background image ki positioning
    heroFocus: { type: focusSchema, default: () => ({ x: 50, y: 50 }) },
    heroFocusMobile: { type: focusSchema, default: () => ({ x: 50, y: 40 }) },
    heroOverlay: { type: Number, default: 82, min: 0, max: 100 },
    heroBlur: { type: Number, default: 0, min: 0, max: 20 },

    resumeUrl: { type: String, default: "/resume.pdf" },

    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },

    socials: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },

    stats: [
      {
        label: String,
        value: String,
        _id: false,
      },
    ],

    // Hindi aur Hinglish translations.
    // Shape: { hi: { title, tagline, shortBio, longBio, stats, aboutHighlights }, hinglish: {...} }
    translations: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
