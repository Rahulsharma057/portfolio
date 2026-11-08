const multer = require("multer");

const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

const fileFilter = (req, file, cb) => {
  if (ALLOWED.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Sirf JPG, PNG, WEBP ya GIF image allowed hai"), false);
};

module.exports = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});
