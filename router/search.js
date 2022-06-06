const express = require('express')
const router = express.Router()
const {
  searchTest,
  getSearch
} = require('../controller/searchController')

router.get('/test', searchTest)

router.get('/:category', getSearch)

module.exports = router