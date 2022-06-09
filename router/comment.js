const express = require('express')
const router = express.Router()
const {
  getCommentTest,
  addComment,
  getAllComment,
  getCommentById
} = require('../controller/commentController')

router.get('/test', getCommentTest)

router.post('/', addComment)

router.get('/', getAllComment)

router.get('/:id', getCommentById)

module.exports = router