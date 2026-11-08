const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const c = require("../controllers/education.controller");

router.get("/", c.getAll);
router.get("/:id", c.getOne);
router.post("/", protect, c.create);
router.put("/:id", protect, c.update);
router.delete("/:id", protect, c.remove);

module.exports = router;
