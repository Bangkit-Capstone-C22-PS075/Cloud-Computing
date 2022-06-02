const express = require('express')
const router = express.Router()
const {
  auth,
  addUser,
  getAllUsers,
  getUserById,
  editUserById,
  deleteUserById
} = require('../controller/userController')

// users routing
router.post('/', addUser)

router.get('/auth/:username/:password', auth)

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.put('/:id', editUserById)

router.delete('/:id', deleteUserById)

module.exports = router