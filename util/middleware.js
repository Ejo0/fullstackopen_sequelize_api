const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.message })
  }
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: err.message })
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: err.message })
  }
  if (err.name === 'SequelizeConnectionError') {
    return res.status(502).json({ error: err.message })
  }
  next(err)
}

module.exports = { errorHandler }
