// ownerOperations.js

const Owner = require('../models/ownerModel');

// Create a new property
const createOwner = (ownerData) => {
  const newOwner = new Owner(ownerData);
  return newOwner.save();
};

// Find all properties
const findAllOwners = () => {
  return Owner.find({});
};

const findOwnerById = (id) => {
  return Owner.find({_id: id})
}

// Update a property
const updateOwner = (id, newData) => {
  return Owner.updateOne({ _id: id }, newData);
};

// Delete a property
const deleteOwner = (id) => {
  return Owner.deleteOne({ _id: id });
};

module.exports = {
  createOwner,
  findAllOwners,
  updateOwner,
  deleteOwner,
  findOwnerById
};
