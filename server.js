const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const upload = multer({dest: './uploads'});

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.get('/', (req, res) => res.render('index'));

app.post('/getData', upload.single('file'), (req, res) => {
  if(req.file) {
    res.json({
      filename: req.file.originalname,
      filesize: req.file.size,
      mimetype: req.file.mimetype
    });
  }
  else {
    res.json({error: true, message: 'No file provided'});
  }
});

app.listen(port, () => console.log('Server listening on port %s', port));
