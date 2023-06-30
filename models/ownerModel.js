// ownerModel.js

const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true
  },
  ownerProperties : [{
    type: mongoose.Schema.Types.ObjectId,
  }], 
  email : {
    type: String, 
    required: true
  }, 
  phoneNumber: {
    type: String, 
    required: true
  }
  
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
