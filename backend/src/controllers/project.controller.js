const Project = require("../models/Project");
const crudFactory = require("../utils/crudFactory");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const base = crudFactory(Project, {
  sort: { order: 1, createdAt: -1 },
  imageFields: ["coverImage"],
  arrayImageFields: ["gallery"],
  filterable: ["category"],
});

// GET /api/v1/projects/featured
const getFeatured = asyncHandler(async (req, res) => {
  const projects = await Project.find({ isFeatured: true }).sort({
    order: 1,
    createdAt: -1,
  });
  res.json({ success: true, count: projects.length, data: projects });
});

// GET /api/v1/projects/:slug
const getBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) throw new ApiError(404, "Project not found");
  res.json({ success: true, data: project });
});

module.exports = { ...base, getFeatured, getBySlug };
