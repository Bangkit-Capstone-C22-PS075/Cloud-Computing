const { v4: uuidv4 } = require('uuid');
const db = require('../database')

const getProductTest = (req, res) => {
  res.send('this is product controller')
}

const addProduct = (req, res) => {
  const {
    productPhoto,
    name,
    definition,
    price_1,
    price_2
  } = req.body

  const id = uuidv4()
  const insertedAt = new Date().toISOString()

  const newProduct = {
    id,
    productPhoto,
    name,
    definition,
    price_1,
    price_2,
    insertedAt
  }

  const getObjVal = Object.values(newProduct)

  let query = "INSERT INTO tbl_product (id, productPhoto, name, definition, price_1, price_2, insertedAt) VALUES (?, ?, ?, ?, ?, ?, ?)"
  db.query(query, getObjVal, (err) => {
    if (err) {
      res.status(201).send('Product failed to add')
      throw err
    }
    res.status(200).send({
      status: 'success',
      message: 'Product added successfully',
      data: {
        productId: newProduct.id
      }
    })
  })
}

const getAllProduct = (req, res) => {
  let query = "SELECT * FROM tbl_product"
  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send('Cannot get products')
      throw err
    }
    res.status(200).send(result)
  })
}

const getProductById = (req, res) => {
  const { id } = req.params

  let query = "SELECT * FROM tbl_product WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (result.length == 0) {
      res.status(404).send({
        status: 'fail',
        message: 'Product not found'
      })
    } else if (!err && result.length !== 0) {
      res.status(200).send(result)
    }
  })
}

const editProductById = (req, res) => {
  const { id } = req.params

  const {
    productPhoto,
    name,
    definition,
    price_1,
    price_2
  } = req.body

  const updatedAt = new Date().toISOString()

  let query = "UPDATE tbl_product SET productPhoto = ?, name = ?, definition = ?, price_1 = ?, price_2 = ?, updatedAt = ? WHERE id = ?"
  db.query(query, [
    productPhoto,
    name,
    definition,
    price_1,
    price_2,
    updatedAt,
    id
  ], (err, result) => {
    if (err) {
      res.status(404)
      res.send({
        status: 'fail',
        message: 'Failed to update product, id not found'
      })
      throw err
    }
    res.status(200)
    res.send({
      status: 'success',
      message: 'Product successfully updated'
    })
  })
}

const deleteProductById = (req, res) => {
  const { id } = req.params

  let query = "DELETE FROM tbl_product WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(404).send({
        status: 'fail',
        message: 'Product failed to delete, id not found'
      })
      throw err
    }
    res.status(200).send({
      status: 'success',
      message: 'Product successfully deleted'
    })
  })
}

// function priceRangeFormat(p1, p2) {
//   console.log(products.priceRange)
//   const result = "Rp. " + p1 + " - " + "Rp. " + p2
//   console.log(result)
// }

module.exports = {
  getProductTest,
  addProduct,
  getAllProduct,
  getProductById,
  editProductById,
  deleteProductById
}