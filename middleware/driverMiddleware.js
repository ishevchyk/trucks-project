
const driverMiddleware = (req, res, next) => {
  const role = req.user.role;
  if (role !== "DRIVER") return res.status(401).send({
    "message": "Access denied."
  })
  next()
}

module.exports = driverMiddleware
