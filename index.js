const express = require('express');
const app = express();
var PORT = 3000;


//APP USE
app.use('/images', express.static(__dirname + '/images'));

// ROUTE
const emaitransapp = require("./emaitransappRoute/index.js");
const emaitransappRoute = emaitransapp.router;
app.use("/", emaitransapp);

app.listen(PORT, function(err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
