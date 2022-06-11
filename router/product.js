const express = require('express')
const router = express.Router()
const {
  getProductTest,
  addProduct,
  getAllProduct,
  getProductById,
  editProductById,
  deleteProductById
} = require('../controller/productController')

// [START gae_storage_app]
const Multer = require('multer');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

router.get('/test', getProductTest)

router.post('/', multer.single('productPhoto'), addProduct)

router.get('/', getAllProduct)

router.get('/:id', getProductById)

router.put('/:id', editProductById)

router.delete('/:id', deleteProductById)

module.exports = router