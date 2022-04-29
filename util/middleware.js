const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.message })
  }
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

module.exports = { errorHandler }
