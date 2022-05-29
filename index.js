const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.status(200).send('<h2>Hello yoi mamen</h2>').end()
})

app.get('/boy', (req, res) => {
  res.status(200).send('<h2>Hello yoi boyy</h2>').end()
})

app.get('/kratos', (req, res) => {
  res.status(200).send('<h2>Son of kratos</h2>').end()
})

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]