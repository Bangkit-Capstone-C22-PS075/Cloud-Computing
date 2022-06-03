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

// define the route
router.get('/default', (req, res) => {
  res.send('Sellers home page')
})

router.get('/test', getSellerTest)

// start here
router.post('/', addSeller)

router.get('/', getAllSellers)

router.get('/:id', getSellerById)

router.put('/:id', editSellerById)

router.delete('/:id', deleteSellerById)

module.exports = router