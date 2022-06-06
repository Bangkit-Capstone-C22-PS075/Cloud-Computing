const db = require('../database')

const searchTest = (req, res) => {
  res.send('this is search test new')
}

const getSearch = (req, res) => {
  const { category } = req.params

  let query = "SELECT * FROM tbl_product WHERE category = ?"
  db.query(query, [category], (err, result) => {
    if (err) {
      res.status(404).send('Cannot get data')
      throw err
    }
    res.status(200).send({
      status: 'success',
      sellers: result
    })
  })
}

module.exports = {
  searchTest,
  getSearch
}