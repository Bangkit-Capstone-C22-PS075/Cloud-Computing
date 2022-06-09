const { v4: uuidv4 } = require('uuid');
const db = require('../database')

const getCommentTest = (req, res) => {
  res.send('comment test')
}

const addComment = (req, res) => {
  const {
    userId,
    username,
    comment,
    rating
  } = req.body

  const id = uuidv4()

  const newComment = {
    id,
    userId,
    username,
    comment,
    rating
  }

  const getObjVal = Object.values(newComment)

  let query = "INSERT INTO tbl_comment (id, userId, username, comment, rating) VALUES (?, ?, ?, ?, ?)"
  db.query(query, getObjVal, (err) => {
    if (err) {
      res.status(201).send('Comment failed to add')
      throw err
    }
    res.status(200)
    res.send({
      status: 'success',
      message: 'Comment added successfully',
      data: {
        commentId: newComment.id
      }
    })
  })
}

const getAllComment = (req, res) => {
  let query = "SELECT * FROM tbl_comment"
  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send('Cannot get comments')
      throw err
    }
    res.status(200).send({
      status: 'success',
      sellers: result
    })
  })
}

const getCommentById = (req, res) => {
  const { id } = req.params

  let query = "SELECT * FROM tbl_comment WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (result.length == 0) {
      res.status(404).send({
        status: 'fail',
        message: 'Comment not found'
      })
    } else if (!err && result.length !== 0) {
      res.status(200).send(result)
    }
  })
}

module.exports = {
  getCommentTest,
  addComment,
  getAllComment,
  getCommentById
}