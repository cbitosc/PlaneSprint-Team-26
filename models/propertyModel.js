// propertyModel.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true
  },
  propertyPlace : {
    type: String, 
    required: true
  },
  propertyOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  }, 
  propertyRate: {
    type: String, 
    required: true
  }
,
  reservations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
  }],
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
