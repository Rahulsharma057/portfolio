const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// POST /api/v1/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(400, "Email aur password dono zaroori hain");

  const user = await User.findOne({ email: String(email).toLowerCase() }).select(
    "+password"
  );

  if (!user || !(await user.matchPassword(password)))
    throw new ApiError(401, "Invalid credentials");

  res.json({
    success: true,
    message: "Login successful",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

// GET /api/v1/auth/me
exports.getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

// PUT /api/v1/auth/change-password
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword)
    throw new ApiError(400, "Purana aur naya dono password chahiye");

  if (String(newPassword).length < 6)
    throw new ApiError(400, "Naya password kam se kam 6 character ka ho");

  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.matchPassword(currentPassword)))
    throw new ApiError(401, "Purana password galat hai");

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: "Password badal gaya" });
});
