const mysql = require("mysql")

// const pool = mysql.createPool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
// })

const pool = mysql.createPool({
  user: 'root',
  password: 'dJahit123',
  database: 'd-jahit-db',
  socketPath: `/cloudsql/cogent-tempo-351103:asia-southeast2:d-jahit-project`
})

// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "d-jahit-db",
// })

module.exports = pool
