// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }, 
  phoneNumber: {
    type: String
  }
});

// Method to validate password
userSchema.methods.validatePassword = function (password) {
  return this.password == password; 
};

const User = mongoose.model('User', userSchema);

module.exports = User;
