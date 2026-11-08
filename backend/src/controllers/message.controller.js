const Message = require("../models/Message");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

// POST /api/v1/messages  (public - contact form)
exports.createMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const doc = await Message.create({ name, email, phone, subject, message });

  res.status(201).json({
    success: true,
    data: { _id: doc._id },
    message: "Message bhej diya gaya. Jald hi reply milega.",
  });
});

// GET /api/v1/messages  (protected)
exports.getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  const unread = messages.filter((m) => !m.isRead).length;

  res.json({ success: true, count: messages.length, unread, data: messages });
});

// PUT /api/v1/messages/:id/read  (protected)
exports.markAsRead = asyncHandler(async (req, res) => {
  const msg = await Message.findById(req.params.id);
  if (!msg) throw new ApiError(404, "Message not found");

  msg.isRead = req.body.isRead === undefined ? true : !!req.body.isRead;
  await msg.save();

  res.json({ success: true, data: msg, message: "Updated" });
});

// DELETE /api/v1/messages/:id  (protected)
exports.deleteMessage = asyncHandler(async (req, res) => {
  const msg = await Message.findById(req.params.id);
  if (!msg) throw new ApiError(404, "Message not found");

  await msg.deleteOne();
  res.json({ success: true, message: "Message deleted" });
});
