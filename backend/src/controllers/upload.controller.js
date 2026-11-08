const cloudinary = require("../config/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// POST /api/v1/upload   (field name: "image")
exports.uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "Koi file nahi mili");

  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio",
        resource_type: "image",
        transformation: [
          { width: 1600, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, uploaded) => (error ? reject(error) : resolve(uploaded))
    );
    stream.end(req.file.buffer);
  });

  res.status(201).json({
    success: true,
    message: "Image uploaded",
    data: { url: result.secure_url, public_id: result.public_id },
  });
});

// DELETE /api/v1/upload/:public_id
// Cloudinary ke public_id me "/" hota hai jo URL todta hai,
// isliye frontend "/" ko "---" bhejta hai aur yahan wapas badal lete hain.
exports.deleteImage = asyncHandler(async (req, res) => {
  const publicId = String(req.params.public_id).replace(/---/g, "/");

  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result !== "ok" && result.result !== "not found")
    throw new ApiError(400, "Image delete nahi ho payi");

  res.json({ success: true, message: "Image deleted" });
});
