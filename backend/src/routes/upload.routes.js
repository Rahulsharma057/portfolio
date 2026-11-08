const router = require("express").Router();
const upload = require("../middleware/upload.middleware");
const { protect } = require("../middleware/auth.middleware");
const c = require("../controllers/upload.controller");

router.post("/", protect, upload.single("image"), c.uploadImage);
router.delete("/:public_id", protect, c.deleteImage);

module.exports = router;
