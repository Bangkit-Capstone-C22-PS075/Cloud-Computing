const { v4: uuidv4 } = require('uuid');
const db = require('../database')

const getSellerTest = (req, res) => {
  res.send('this is seller controller')
}

const addSeller = (req, res) => {
  const {
    userId,
    shopName,
    province,
    city,
    streetName,
    detailStreet,
    skill,
    sellerPhoto,
    sellerName,
    phoneNumber,
    email,
    latitude,
    longtitude
  } = req.body

  const id = uuidv4()
  const insertedAt = new Date().toISOString()

  const newSeller = {
    id,
    userId,
    shopName,
    province,
    city,
    streetName,
    detailStreet,
    skill,
    sellerPhoto,
    sellerName,
    phoneNumber,
    email,
    insertedAt,
    latitude,
    longtitude
  }

  const getObjVal = Object.values(newSeller)

  let query = "INSERT INTO tbl_seller (id, userId, shopName, province, city, streetName, detailStreet, skill, sellerPhoto, sellerName, phoneNumber, email, insertedAt, latitude, longtitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  db.query(query, getObjVal, (err) => {
    if (err) {
      res.status(201).send('Seller failed to add')
      throw err
    }
    res.status(200)
    res.send({
      status: 'success',
      message: 'Seller added successfully',
      data: {
        sellerId: newSeller.id
      }
    })
  })
}

const getAllSellers = (req, res) => {
  let query = "SELECT * FROM tbl_seller"
  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send('Cannot get sellers')
      throw err
    }
    res.status(200).send({
      status: 'success',
      sellers: result
    })
  })
}

const getSellerById = (req, res, h) => {
  const { id } = req.params

  let query = "SELECT * FROM tbl_seller WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (result.length == 0) {
      res.status(404).send({
        status: 'fail',
        message: 'Seller not found'
      })
    } else if (!err && result.length !== 0) {
      res.status(200).send(result)
    }
  })
}

const editSellerById = (req, res) => {
  const { id } = req.params

  const {
    shopName,
    province,
    city,
    streetName,
    detailStreet,
    skill,
    sellerPhoto,
    sellerName,
    phoneNumber,
    email,
    latitude,
    longtitude
  } = req.body

  const updatedAt = new Date().toISOString()

  let query = "UPDATE tbl_seller SET shopName = ?, province = ?, city = ?, streetName = ?, detailStreet = ?, skill = ?, sellerPhoto = ?, sellerName = ?, phoneNumber = ?, email = ?, latitude = ?, longtitude = ?, updatedAt = ? WHERE id = ?"
  db.query(query, [
    shopName,
    province,
    city,
    streetName,
    detailStreet,
    skill,
    sellerPhoto,
    sellerName,
    phoneNumber,
    email,
    latitude,
    longtitude,
    updatedAt,
    id
  ], (err) => {
    if (err) {
      res.status(404)
      res.send({
        status: 'fail',
        message: 'Seller not found'
      })
      throw err
    }
    res.status(200)
    res.send({
      status: 'success',
      message: 'Seller successfully updated'
    })
  })
}

const deleteSellerById = (req, res) => {
  const { id } = req.params

  let query = "DELETE FROM tbl_seller WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(404).send({
        status: 'fail',
        message: 'Seller failed to delete, id not found'
      })
      throw err
    }
    res.status(200).send({
      status: 'success',
      message: 'Seller successfully deleted'
    })
  })
}

module.exports = {
  getSellerTest,
  addSeller,
  getAllSellers,
  getSellerById,
  editSellerById,
  deleteSellerById
}