const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const c = require("../controllers/profile.controller");

router.get("/", c.getProfile);
router.put("/", protect, c.updateProfile);

module.exports = router;
