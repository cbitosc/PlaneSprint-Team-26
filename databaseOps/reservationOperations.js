// reservationOperations.js

const Reservation = require('../models/reservationModel');

// Create a new reservation
const createReservation = (reservationData) => {
  const newReservation = new Reservation(reservationData);
  return newReservation.save();
};

// Find reservations by user
const findReservationsByUser = (userId) => {
  return Reservation.find({ user: userId }).populate('property');
};

// Other reservation operations
// ...

module.exports = {
  createReservation,
  findReservationsByUser,
  // ...
};
