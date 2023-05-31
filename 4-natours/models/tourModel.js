const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour must have a price'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    requires: [true, 'a tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    requires: [true, 'a tour must have a group size'],
  },
  difficulty: {
    type: String,
    requires: [true, 'a tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'a tour must have a price'],
  },
  priceDiscount: { type: Number },
  summary: {
    type: String,
    trim: true,
    required: [true, 'a tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'a tour must have a cove image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
