var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), function (req, res) {
  const _body = req.body
  const _respBody = {
    name: req.file.filename,
    type: req.file.mimetype.split("/")[req.file.mimetype.split("/").length - 1],
    size: req.file.size
  }

  console.log("_respBody:", _respBody);
  console.log("_body:", _body);

  res.send(_respBody)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
