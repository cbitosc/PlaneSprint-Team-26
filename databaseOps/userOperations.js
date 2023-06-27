// userOperations.js

const User = require('../models/userModel');

// Create a new user
const createUser = (userData) => {
  console.log(userData);
  const newUser = new User(userData);
  return newUser.save();
};

// Find all users
const findAllUsers = () => {
  return User.find({});
};
const findOne = (Username) => {
  return User.find({username: Username});
};
 
// user by id
const findById = (id) =>{
  return User.find({_id: id})
}

// Update a user
const updateUser = (username, newData) => {
  return User.updateOne({ username: username }, newData);
};

// Delete a user
const deleteUser = (username) => {
  return User.deleteOne({ username: username });
};

const validatePassword = (user, password) => {
  return user.password === password;
}



module.exports = {
  createUser,
  findAllUsers,
  updateUser,
  deleteUser, 
  findOne, 
  findById, 
  validatePassword
};
