const express = require('express')
const router = express.Router()
const {
  getTransactionTest,
  beginTransaction,
  getAllTransaction,
  getTransactionById,
  deleteTransactionById
} = require('../controller/transactionController')

router.get('/test', getTransactionTest)

router.post('/', beginTransaction)

router.get('/', getAllTransaction)

router.get('/:idTransaction', getTransactionById)

router.delete('/:idTransaction', deleteTransactionById)

module.exports = router