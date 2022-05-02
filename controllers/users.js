const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {exclude: ['userId']},
      through: {
        attributes: []
      }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  req.body.passwordHash = await bcrypt.hash(req.body.password, 10)
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: {exclude: ['userId']}
      },
      {
        model: Blog,
        as: 'readings',
        through: {
          attributes: []
        }
      }
    ]
  })
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({where: {username: req.params.username}})
  user.name = req.body.name
  await user.save()
  res.json(user)
})

module.exports = router
