const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const c = require("../controllers/message.controller");

router.post("/", c.createMessage); // public - contact form
router.get("/", protect, c.getMessages);
router.put("/:id/read", protect, c.markAsRead);
router.delete("/:id", protect, c.deleteMessage);

module.exports = router;
