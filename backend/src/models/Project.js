const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const imageSchema = new mongoose.Schema(
  { url: String, public_id: String },
  { _id: false }
);

// Live demo ke test accounts. Recruiter in se demo me login karke
// har role ka alag view dekh sakta hai.
//
// DHYAN: yahan sirf DEMO/SEED accounts ke credentials daalne hain -
// jo dummy data ke saath ek throwaway demo database pe chalte hain.
// Kisi asli client ya production system ka login kabhi mat daalna.
const credentialSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    email: { type: String, default: "", trim: true },
    password: { type: String, default: "", trim: true },
    note: { type: String, default: "" },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title zaroori hai"], trim: true },
    slug: { type: String, unique: true, index: true },
    shortDescription: { type: String, default: "", maxlength: 300 },
    longDescription: { type: String, default: "" },
    category: {
      type: String,
      enum: ["ERP", "Full Stack", "Frontend", "Client Work", "Other"],
      default: "Full Stack",
    },
    techStack: { type: [String], default: [] },
    coverImage: { type: imageSchema, default: {} },
    gallery: { type: [imageSchema], default: [] },

    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },

    // Demo login ke liye
    demoCredentials: { type: [credentialSchema], default: [] },
    demoNote: { type: String, default: "" },

    isFeatured: { type: Boolean, default: false },
    isConfidential: { type: Boolean, default: false },
    order: { type: Number, default: 0 },

    // { hi: { title, shortDescription, longDescription }, hinglish: {...} }
    translations: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// Title se slug automatic banta hai; duplicate hone par number lag jata hai.
// Slug hamesha English title se banta hai, taaki URL language badalne par na badle.
projectSchema.pre("validate", async function (next) {
  if (!this.isModified("title") && this.slug) return next();

  const base = slugify(this.title) || "project";
  let slug = base;
  let counter = 1;

  while (await this.constructor.findOne({ slug, _id: { $ne: this._id } })) {
    slug = `${base}-${counter++}`;
  }

  this.slug = slug;
  next();
});

module.exports = mongoose.model("Project", projectSchema);
