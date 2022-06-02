const { v4: uuidv4 } = require('uuid');
const db = require('../database')

const getUserTest = (req, res) => {
  res.send('this is user controller')
}

const auth = (req, res) => {
  const { username, password } = req.params

  let query = "SELECT id, username, password FROM tbl_user WHERE username = ? AND password = ?"
  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(404).send({
        status: 'fail',
        message: 'User not found'
      })
      throw err
    }
    res.status(200).send({
      status: 'success',
      loginResult: {
        userId: result
      }
    })
  })
}

const addUser = (req, res) => {
  const {
    fullName,
    username,
    password,
    gender,
    dateOfBirth,
    phoneNumber,
    email,
    photoProfile,
    latitude,
    longtitude
  } = req.body

  const id = uuidv4()
  const insertedAt = new Date().toISOString()

  const newUser = {
    id,
    fullName,
    username,
    password,
    gender,
    dateOfBirth,
    phoneNumber,
    email,
    photoProfile,
    latitude,
    longtitude,
    insertedAt
  }

  const getObjVal = Object.values(newUser)

  let query = "INSERT INTO tbl_user (id, fullName, username, password, gender, dateOfBirth, phoneNumber, email, photoProfile, latitude, longtitude, insertedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  db.query(query, getObjVal, (err) => {
    if (err) {
      res.status(201).send('User failed to add')
      throw err
    }
    res.status(200)
    res.send({
      status: 'success',
      message: 'User added successfully',
      data: {
        userId: newUser.id
      }
    })
  })
}

const getAllUsers = (req, res) => {
  let query = "SELECT * FROM tbl_user"
  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send('Cannot get users')
      throw err
    }
    res.status(200).send(result)
  })
}

const getUserById = (req, res) => {
  const { id } = req.params

  let query = "SELECT * FROM tbl_user WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (result.length == 0) {
      res.status(404).send({
        status: 'fail',
        message: 'User not found'
      })
    } else if (!err && result.length !== 0) {
      res.status(200).send(result)
    }
  })
}

const editUserById = (req, res) => {
  const { id } = req.params

  const {
    fullName,
    username,
    password,
    gender,
    dateOfBirth,
    phoneNumber,
    email,
    photoProfile,
    latitude,
    longtitude
  } = req.body

  const updatedAt = new Date().toISOString()

  let query = "UPDATE tbl_user SET fullName = ?, username = ?, password = ?, gender = ?, dateOfBirth = ?, phoneNumber = ?, email = ?, photoProfile = ?, latitude = ?, longtitude = ?, updatedAt = ? WHERE id = ?"
  db.query(query, [
    fullName,
    username,
    password,
    gender,
    dateOfBirth,
    phoneNumber,
    email,
    photoProfile,
    latitude,
    longtitude,
    updatedAt,
    id
  ], (err, result) => {
    if (err) {
      res.status(404)
      res.send({
        status: 'fail',
        message: 'User not found'
      })
      throw err
    }
    res.status(200)
    res.send({
      status: 'success',
      message: 'User successfully updated'
    })
  })
}

const deleteUserById = (req, res) => {
  const { id } = req.params

  let query = "DELETE FROM tbl_user WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(404).send({
        status: 'fail',
        message: 'Users failed to delete, id not found'
      })
      throw err
    }
    res.status(200).send({
      status: 'success',
      message: 'Users successfully deleted'
    })
  })
}

module.exports = {
  getUserTest,
  addUser,
  auth,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById,
}

