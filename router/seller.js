const express = require('express')
const router = express.Router()
const {
  getSellerTest,
  addSeller,
  getAllSellers,
  getSellerById,
  editSellerById,
  deleteSellerById
} = require('../controller/sellerController')

// [START gae_storage_app]
const Multer = require('multer');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// define the route
router.get('/default', (req, res) => {
  res.send('Sellers home page')
})

router.get('/test', getSellerTest)

// start here
router.post('/', multer.single('sellerPhoto'), addSeller)

router.get('/', getAllSellers)

router.get('/:userId', getSellerById)

router.put('/:id', editSellerById)

router.delete('/:id', deleteSellerById)

module.exports = router