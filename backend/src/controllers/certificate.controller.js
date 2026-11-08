const Certificate = require("../models/Certificate");
const crudFactory = require("../utils/crudFactory");

module.exports = crudFactory(Certificate, {
  sort: { issueDate: -1, order: 1 },
  imageFields: ["image"],
});
