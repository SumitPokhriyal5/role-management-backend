const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: String,
  permissions: [String],
});

const RoleModel = mongoose.model('Role', roleSchema);

module.exports = { RoleModel }