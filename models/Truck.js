const mongoose = require('mongoose');
const Joi = require('joi');

const trucksSchema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  type: {
    type: String,
    enum: ['SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT']
  },
  status: {
    type: String,
    enum: ['OL', 'IS'],
    default: 'IS'
  },
  dimensions: {
    length: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  payload: {
    type: Number,
    required: true,
  },

}, {timestamps: {
    createdAt: "createdDate"
  }})

const Truck = mongoose.model('Truck', trucksSchema);

const validateTruck = (truck) => {
  const schema = Joi.object({
    type: Joi.string().required().valid('SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT').insensitive()
  });
  return schema.validate(truck, {"convert": true})
}
module.exports = {
  Truck,
  validateTruck,
  trucksSchema
}
