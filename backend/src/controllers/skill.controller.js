const Skill = require("../models/Skill");
const crudFactory = require("../utils/crudFactory");

module.exports = crudFactory(Skill, {
  sort: { category: 1, order: 1, name: 1 },
  imageFields: ["icon"],
  filterable: ["category"],
});
