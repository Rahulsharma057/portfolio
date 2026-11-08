const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const c = require("../controllers/project.controller");

// ZAROORI: "/featured" ko "/:slug" se PEHLE rakhna.
// Warna Express "featured" ko slug samajh lega aur 404 dega.
router.get("/", c.getAll);
router.get("/featured", c.getFeatured);
router.get("/:slug", c.getBySlug);

router.post("/", protect, c.create);
router.put("/:id", protect, c.update);
router.delete("/:id", protect, c.remove);

module.exports = router;
