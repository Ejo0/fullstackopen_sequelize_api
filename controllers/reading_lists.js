const router = require('express').Router()
const { ReadingList } = require('../models')
const { tokenExtractor} = require('../util/middleware')

router.post('/', async (req, res) => {
  const reading_list = await ReadingList.create(req.body)
  return res.json(reading_list)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const reading_list = await ReadingList.findByPk(req.params.id)
  if (req.decodedToken.id !== reading_list.userId) {
    return res.status(401).json({ error: 'Unauthorized to handle reading list'})
  }
  reading_list.isRead = req.body.read
  await reading_list.save()
  return res.json(reading_list)
})

module.exports = router
