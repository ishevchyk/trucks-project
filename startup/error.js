module.exports = function (app) {
  const errorHandler = (err, req, res, next) => {
    res.status(500).send({message:'Server error'});
  }
  app.use(errorHandler)
}
