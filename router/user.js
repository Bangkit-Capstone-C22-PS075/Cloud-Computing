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

// [START gae_storage_app]
const Multer = require('multer');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// users routing
router.post('/', addUser)

router.post('/auth', auth)

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.put('/:id', multer.single('photoProfile'), editUserById)

router.delete('/:id', deleteUserById)

module.exports = router