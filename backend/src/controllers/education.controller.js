const Education = require("../models/Education");
const crudFactory = require("../utils/crudFactory");

module.exports = crudFactory(Education, {
  sort: { endYear: -1, order: 1 },
});
