const asyncHandler = require("./asyncHandler");
const ApiError = require("./ApiError");
const cloudinary = require("../config/cloudinary");

// Cloudinary se ek image safely hatata hai (fail ho to request nahi todta)
const destroyImage = async (img) => {
  if (img && img.public_id) {
    try {
      await cloudinary.uploader.destroy(img.public_id);
    } catch (err) {
      console.error("Cloudinary delete failed:", err.message);
    }
  }
};

/**
 * Standard CRUD controllers banata hai.
 * options.sort             -> list ka order
 * options.imageFields      -> single image fields, jaise ["coverImage"]
 * options.arrayImageFields -> image array fields, jaise ["gallery"]
 * options.filterable       -> query se filter hone wale fields, jaise ["category"]
 */
module.exports = (Model, options = {}) => {
  const {
    sort = { order: 1, createdAt: -1 },
    imageFields = [],
    arrayImageFields = [],
    filterable = [],
  } = options;

  const name = Model.modelName;

  return {
    getAll: asyncHandler(async (req, res) => {
      const filter = {};
      filterable.forEach((key) => {
        if (req.query[key]) filter[key] = req.query[key];
      });

      const docs = await Model.find(filter).sort(sort);
      res.json({ success: true, count: docs.length, data: docs });
    }),

    getOne: asyncHandler(async (req, res) => {
      const doc = await Model.findById(req.params.id);
      if (!doc) throw new ApiError(404, `${name} not found`);
      res.json({ success: true, data: doc });
    }),

    create: asyncHandler(async (req, res) => {
      const doc = await Model.create(req.body);
      res.status(201).json({
        success: true,
        data: doc,
        message: `${name} created`,
      });
    }),

    update: asyncHandler(async (req, res) => {
      const doc = await Model.findById(req.params.id);
      if (!doc) throw new ApiError(404, `${name} not found`);

      // Purani image hat rahi ho to Cloudinary se bhi hatao
      for (const field of imageFields) {
        const incoming = req.body[field];
        const current = doc[field];
        if (
          current &&
          current.public_id &&
          (!incoming || incoming.public_id !== current.public_id)
        ) {
          await destroyImage(current);
        }
      }

      Object.assign(doc, req.body);
      await doc.save();

      res.json({ success: true, data: doc, message: `${name} updated` });
    }),

    remove: asyncHandler(async (req, res) => {
      const doc = await Model.findById(req.params.id);
      if (!doc) throw new ApiError(404, `${name} not found`);

      for (const field of imageFields) {
        await destroyImage(doc[field]);
      }
      for (const field of arrayImageFields) {
        for (const img of doc[field] || []) await destroyImage(img);
      }

      await doc.deleteOne();
      res.json({ success: true, message: `${name} deleted` });
    }),
  };
};
