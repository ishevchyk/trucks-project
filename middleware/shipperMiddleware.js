const shipperrMiddleware = (req, res, next) => {
  console.log(req.user)
  const role = req.user.role;
  if (role !== "SHIPPER") return res.status(401).send({
    "message": "Access denied."
  })
  next()
}

module.exports = shipperrMiddleware
