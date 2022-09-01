const {User} = require('../models/User');
const nodemailer = require('nodemailer')

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send({
    user
  })
}
const deleteUserProfile = async (req, res) => {
  await User.findByIdAndRemove(req.user._id)
  res.send({
    "message": "Success"
  })
}
const changeUserProfilePassword = async (req, res) => {
  let {oldPassword, newPassword} = req.body;
  let user = await User.findById(req.user._id);

  const validPassword = await bcrypt.compareSync(oldPassword, user.password);
  if (!validPassword) return res.status(400).send({
    "message": "Invalid password"
  });

  const salt = await bcrypt.genSaltSync(10);
  newPassword = await bcrypt.hashSync(newPassword, salt);

  await User.findByIdAndUpdate(req.user._id, {
    password: newPassword,
    new: true
  })

  res.send({
    "message": "Success"
  })
}
module.exports = {
  getUserProfile,
  deleteUserProfile,
  changeUserProfilePassword
}
