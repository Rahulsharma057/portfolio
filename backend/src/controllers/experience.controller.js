const Experience = require("../models/Experience");
const crudFactory = require("../utils/crudFactory");

// Latest experience sabse upar
module.exports = crudFactory(Experience, {
  sort: { startDate: -1, order: 1 },
});
