const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('./config')
const Session = require('../models/session')
const User = require('../models/user')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
    return res.status(401).json({ error: 'token missing'})
  }

  const token = authorization.substring(7)
  const session = await Session.findOne({where: { token }})
  if (!(session)) {
    return res.status(401).json({ error: 'token unvalid or expired'})
  }

  const user = await User.findByPk(session.userId)
  if (user.disabled) {
    await session.destroy()
    return res.status(401).json({ error: 'disabled, please contact admin'})
  }

  req.decodedToken = jwt.verify(token, SECRET_KEY)

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
