const { v4: uuidv4 } = require('uuid');
const db = require('../database')

const getTransactionTest = (req, res) => {
  res.send('this is transaction')
}

const beginTransaction = (req, res) => {
  const {
    userId,
    username,
    idPurpose,
    productName,
    productAmount,
    price,
    totalPrice
  } = req.body

  const idTransaction = uuidv4()
  const insertedAt = new Date().toISOString()

  const newTransaction = {
    idTransaction,
    userId,
    username,
    idPurpose,
    productName,
    productAmount,
    price,
    totalPrice,
    insertedAt
  }

  const getObjVal = Object.values(newTransaction)

  let query = "INSERT INTO tbl_transaction (idTransaction, userId, username, idPurpose, productName, productAmount, price, totalPrice, insertedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  db.query(query, getObjVal, (err) => {
    if (err) {
      res.status(201).send('Transaction failed')
      throw err
    }
    res.status(200)
    res.send({
      status: 'success',
      message: 'Transaction success',
      data: {
        transactionid: newTransaction.idTransaction
      }
    })
  })
}

const getAllTransaction = (req, res) => {
  let query = "SELECT * FROM tbl_transaction"
  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send('Cannot get transactions')
      throw err
    }
    res.status(200).send({
      status: 'success',
      transactions: result
    })
  })
}

const getTransactionById = (req, res) => {
  const { idTransaction } = req.params

  let query = "SELECT * FROM tbl_transaction WHERE idTransaction = ?"
  db.query(query, [idTransaction], (err, result) => {
    if (result.length == 0) {
      res.status(404).send({
        status: 'fail',
        message: 'idTransaction not found'
      })
    } else if (!err && result.length !== 0) {
      res.status(200).send(result)
    }
  })
}

const deleteTransactionById = (req, res) => {
  const { idTransaction } = req.params

  let query = "DELETE FROM tbl_transaction WHERE idTransaction = ?"
  db.query(query, [idTransaction], (err, result) => {
    if (err) {
      res.status(404).send({
        status: 'fail',
        message: 'Transaction to delete, id not found'
      })
      throw err
    }
    res.status(200).send({
      status: 'success',
      message: 'Transaction successfully deleted'
    })
  })
}

module.exports = {
  getTransactionTest,
  beginTransaction,
  getAllTransaction,
  getTransactionById,
  deleteTransactionById
}