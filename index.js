const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const Grid = require('gridfs-stream');

const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));
app.use(bodyParser.json());

// ******DB stuff*******
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Mongo URI
//const mongoURI = 'mongodb+srv://fusuga93:atlas9DsJS3wmIW@cluster0.plqvv.mongodb.net/<dbname>?retryWrites=true&w=majority';
const mongoURI = "mongodb+srv://SmokingMonkey_1:12341234@cluster0.sker2.mongodb.net/<dbname>?retryWrites=true&w=majority";
// Create mongo connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

let gfs;

// Connect GridFS and Mongo
conn.once('open', function () {
  console.log('- Connection open -');
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);

        const fileInfo = {
          filename: filename,
          //aliases: aliases,
          bucketName: 'uploads',
          disableMD5: true
        };
        resolve(fileInfo);
      });
    });
  }
});
var upload = multer({ storage });
var type = upload.single('upl');

app.post('/api', type, (req, res) => {

})

app.get('/videos/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename}, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/png' || file.contentType === 'video/mp4') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
})

//TEST: uploading and array
const dataSchema = new Schema({
  name: String,
  array: [Number]
}, {collection: "data"});

const personalData = mongoose.model('data', dataSchema);

app.post('/data', (req, res)=>{
  const data = req.body;
  
  const personaldata = new personalData({
    name: data.name,
    array: data.scores
  });
    
  personaldata.save(function (err, personaldata) {
    if (err) return console.error(err);
    console.log('meleiro!!!');
  });
      
});