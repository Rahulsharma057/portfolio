const Profile = require("../models/Profile");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/v1/profile  (public)
// Profile hamesha ek hi document hota hai. Na mile to khali bana deta hai.
exports.getProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  res.json({ success: true, data: profile });
});

// PUT /api/v1/profile  (protected)
exports.updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});

  Object.assign(profile, req.body);
  await profile.save();

  res.json({ success: true, data: profile, message: "Profile updated" });
});
