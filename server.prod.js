var path = require('path');
var express = require('express');

var app = express();

app.use(express.static('assets'));
app.use('/static', express.static(__dirname + '/dist'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if(err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
