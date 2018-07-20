/*----------  Vendor Imports  ----------*/
const mongoose = require('mongoose');

/*===================================
=            User Schema            =
===================================*/

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;

/*=====  End of User Schema  ======*/
