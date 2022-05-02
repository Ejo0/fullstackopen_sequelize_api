const router = require('express').Router()
const { ReadingList } = require('../models')

router.post('/', async (req, res) => {
  const reading_list = await ReadingList.create(req.body)
  return res.json(reading_list)
})


module.exports = router
