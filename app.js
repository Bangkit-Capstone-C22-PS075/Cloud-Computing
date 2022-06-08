const express = require('express')
const app = express()
const db = require('./database')
const cors = require('cors')
const userRouter = require('./router/user')
const sellerRouter = require('./router/seller')
const productRouter = require('./router/product')
const searchRouter = require('./router/search')
const transactionRouter = require('./router/transaction')
const process = require('process'); // Required to mock environment variables

// [START gae_storage_app]
const { format } = require('util');
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();

// enable cors for all request
app.use(cors())

// enable middleware
app.use(express.json())

// use specific route handler
app.use('/user', userRouter)
app.use('/seller', sellerRouter)
app.use('/product', productRouter)
app.use('/search', searchRouter)
app.use('/transaction', transactionRouter)

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// add your bucket name here boyy
const bucket = storage.bucket('cogent-tempo-351103.appspot.com');

// for testing
app.get('/', (req, res) => {
  res.status(200).send('<h2>Hello yoi mamen</h2>').end()
})

app.get('/boy', (req, res) => {
  res.status(200).send('<h2>Hello yoi boyy</h2>').end()
})

app.get('/test', (req, res) => {
  let query = "SELECT * FROM tbl_test"

  db.query(query, (err, result) => {
    if (!err) {
      res.send(result);
    }
    if (err) {
      res.status(400).send(err);
      return;
    }
  });
})

// Process the file upload and upload to Google Cloud Storage.
app.post('/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

// Start the server
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]