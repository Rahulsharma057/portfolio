const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const c = require("../controllers/auth.controller");

router.post("/login", c.login);
router.get("/me", protect, c.getMe);
router.put("/change-password", protect, c.changePassword);

module.exports = router;
