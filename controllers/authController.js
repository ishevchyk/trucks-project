const {User, validateUser} = require('../models/User')
const bcrypt = require("bcryptjs");
const registerUser = async (req, res) => {
  // const {error} = validateUser(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const { email, password, role} = await req.body;
  let user = await User.findOne({email});
  if (user) return res.status(400).send({
    "message": "User already exist."
  });

  user = new User({email, password, role});

  const salt = await bcrypt.genSaltSync(10);
  user.password = await bcrypt.hashSync(user.password, salt);

  await user.save()

  res.send({
    "message": "Success"
  });
}

const loginUser = async (req, res) => {
  const {error} = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send({
    "message": "Invalid email or password"
  });

  const validPassword = await bcrypt.compareSync(String(req.body.password), String(user.password));
  if (!validPassword) return res.status(400).send({
    "message": "Invalid email or password"
  });

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send({
    "message": "Success",
    "jwt_token": `${token}`
  })
}


module.exports = {
  registerUser,
  loginUser

}

