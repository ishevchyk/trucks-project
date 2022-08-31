const mongoose = require('mongoose');
const Joi = require('joi');

const loadsSchema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  status: {
    type: String,
    enum: ['NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'],
    default: 'NEW'
  },
  state: {
    type: String,
    enum: ['En route to Pick Up', 'Arrived to Pick Up', 'En route to delivery', 'Arrived to delivery']
  },
  name: {
    type: String,
    required: true
  },
  pickup_address: {
    type: String,
    required: true
  },
  delivery_address: {
    type: String,
    required: true
  },
  dimensions: {
    width: {
      type: Number,
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  payload: {
      type: Number,
      required: true
  },
  logs: [
    {
      message: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now(),
      }
    }
    ]

}, {timestamps: {
    createdAt: "createdDate"
  }})


const Load = mongoose.model('Load', loadsSchema);

module.exports = {
  Load,
  loadsSchema
}
