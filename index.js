require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//APP USE
app.use('/images', express.static(__dirname + '/images'));
app.use('/template', express.static(__dirname + '/template'));

// ROUTE
const emaitransapp = require("./emaitransappRoute");
const emaitransappRoute = emaitransapp.router;
app.use("/", emaitransappRoute);

emaitransapp.startApp(
  {
    MONGODB_URI: process.env.mongoUrl,
    API_ENDPOINT: process.env.API_ENDPOINT,
    //REDIS_HOST: process.env.REDIS_HOST,
    //REDIS_PORT: process.env.REDIS_PORT,
    //REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    //CACHE_ENABLED: process.env.CACHE_ENABLED,
    log: process.env.API_LOG
  }, () => {
    console.log("Tilebot route successfully started.");
    var port = process.env.PORT || 3000;
    app.listen(port, function() {
      console.log('Tilebot connector listening on port ', port);
    });
  }
);


//setting middleware
//Serves resources from public folder
//app.use(express.static(__dirname + 'public'));


//app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', urlencodedParser, (req, res) => {
  console.log('Got body:', req.body);
  res.sendStatus(200);
});

app.listen(3000);
*/