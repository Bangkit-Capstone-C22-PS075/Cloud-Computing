const express = require('express')
const app = express()
const mysql = require("mysql")
const config = require('./service-key.json')
// const db = require('./database')

app.get('/', (req, res) => {
  res.status(200).send('<h2>Hello yoi mamen</h2>').end()
})

app.get('/boy', (req, res) => {
  res.status(200).send('<h2>Hello yoi boyy</h2>').end()
})

app.get('/kratos', (req, res) => {
  res.status(200).send('<h2>Son of kratos</h2>').end()
})

app.get('/test', (req, res) => {
  let query = "SELECT * FROM tbl_test"

  pool.query(query, (err, result) => {
    if (!err) {
      res.send(result);
    }
    if (err) {
      res.status(400).send(err);
      return;
    }
  });
})

// const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: process.env.INSTANCE_UNIX_SOCKET
})

// const pool = mysql.createPool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   socketPath: `${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`,
//   ...config
// })

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]