// propertyOperations.js

const Property = require('../models/propertyModel');

// Create a new property
const createProperty = (propertyData) => {
  const newProperty = new Property(propertyData);
  return newProperty.save();
};

// Find all properties
const findAllProperties = () => {
  return Property.find({});
};

const findPropById = (id) => {
  return Property.findById(id);
};

// Update a property
const updateProperty = (propertyId, newData) => {
  return Property.updateOne({ _id: propertyId }, newData);
};

// Delete a property
const deleteProperty = (propertyId) => {
  return Property.deleteOne({ _id: propertyId });
};

module.exports = {
  createProperty,
  findAllProperties,
  updateProperty,
  deleteProperty,
  findPropById
};
