const express = require('express');
var bodyParser = require('body-parser')
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

//setting middleware
//Serves resources from public folder
//app.use(express.static(__dirname + 'public'));


//app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/images'));

app.use('/template', express.static(__dirname + '/template'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', urlencodedParser, (req, res) => {
  console.log('Got body:', req.body);
  res.sendStatus(200);
});

app.listen(3000);