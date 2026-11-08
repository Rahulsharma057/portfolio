const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title zaroori hai"], trim: true },
    issuer: { type: String, default: "" },
    issueDate: { type: Date },
    image: {
      url: String,
      public_id: String,
    },
    fileUrl: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },

    // { hi: { title, issuer }, hinglish: {...} }
    translations: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
