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

router.get('/test', getProductTest)

router.post('/', addProduct)

router.get('/', getAllProduct)

router.get('/:id', getProductById)

router.put('/:id', editProductById)

router.delete('/:id', deleteProductById)

module.exports = router