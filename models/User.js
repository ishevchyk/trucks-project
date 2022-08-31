const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const dotenv = require('dotenv').config();

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 1,
    maxLength: 255
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024
  },
  role: {
    type: String,
    enum: ['SHIPPER', 'DRIVER'],
    required: true
  },
  assigned_truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck',
  }

}, {timestamps: {
    createdAt: "createdDate"
  }})

usersSchema.methods.generateAuthToken = function () {
  return jwt.sign({_id: this._id, role: this.role}, dotenv.parsed.JWT_SECRET_KEY);
}

const User = mongoose.model('User', usersSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(1).max(55).email().required(),
    password: Joi.string().min(1).max(255).required(),
    role: Joi.string()
  });
  return schema.validate(user)
}
module.exports = {
  User,
  validateUser,
  usersSchema
}
