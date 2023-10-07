const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    roleId: Number,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };