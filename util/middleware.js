const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('./config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET_KEY)
  } else {
    return res.status(401).json({ error: 'token missing'})
  }
  next()
}

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

module.exports = { errorHandler, tokenExtractor }
