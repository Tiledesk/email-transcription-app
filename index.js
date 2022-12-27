const express = require('express');
const app = express();


//APP USE
app.use('/images', express.static(__dirname + '/images'));
//app.use('/template', express.static(__dirname + '/template'));

// ROUTE
const emaitransapp = require("./emaitransappRoute");
const emaitransappRoute = emaitransapp.router;
app.use("/", emaitransappRoute);

/*

const BASE_URL = process.env.BASE_URL;
const API_URL = process.env.API_URL;
const MONGODB_URL = process.env.MONGODB_URL;
const log = false;

emaitransapp.startApp(
  {
    MONGODB_URL: MONGODB_URL,
    API_URL: API_URL,
    BASE_URL: BASE_URL,
    log: log
  }, () => {
    console.log("Emaitransapp route successfully started.");
    var port = process.env.PORT || 3000;
    app.listen(port, function() {
      console.log('Emaitransapp connector listening on port ', port);
    });
  }
);
*/

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
*/
app.listen(3000);
