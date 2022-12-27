"use strict";
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
require('dotenv').config();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const { TiledeskClient } = require('@tiledesk/tiledesk-client');
var assert = require('assert');
const fs = require('fs');
const handlebars = require('handlebars');
const pjson = require('./package.json');
// import node-fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
  fetch(...args));
const { resolve } = require('path');
// Replace if using a different env file or config
const env = require('dotenv').config({ path: './.env' });


router.get('/', async (req, res) => {
  res.send('Home works!')
})

router.get('/create-mail', async (req, res) => {
  var page = '';
  var dir = '';
  //READ THE CONFIGURATION FILE
  console.log('req project_id ', req.query.project_id);
  var projectId = req.query.project_id;
  if (projectId != '') {
    // SETTINGS IS OK!
    console.log('SETTINGS IS OK!');
    var log = false;
    page = '/createmail.html';
    dir = '/template';
    readHTMLFile(page, dir, (err, html) => {
      if (err) {
        console.log("(ERROR) Read html file: ", err);
      }
      var template = handlebars.compile(html);
      var replacements = {
        //domain: domain,
        //pay_method_types: pay_method_types,
        //stripe_publishable_key: sett.stripe_publishable_key,
        //stripe_secret_key: stripe_secret_key,
        //stripe_wehook_segret: sett.stripe_wehook_segret,
      }
      if (log) {
        console.log("Replacements: ", replacements);
      }
      var html = template(replacements);
      res.send(html);
    })
  } else {
    console.log('SETTINGS IS KO!');
    console.log('Request query: ', req.query);
    var log = false;
    var page = '/index.html';
    var dir = '/configure';
    readHTMLFile(page, dir, (err, html) => {
      if (err) {
        console.log("(ERROR) Read html file: ", err);
      }
      var template = handlebars.compile(html);
      var replacements = {
        //domain: domain,
        //pay_method_types: pay_method_types,
        stripe_publishable_key: stripe_publishable_key,
        //stripe_secret_key: stripe_secret_key,
        stripe_wehook_segret: stripe_wehook_segret,
      }
      if (log) {
        console.log("Replacements: ", replacements);
      }
      var html = template(replacements);
      res.send(html);
    })
  }
});

// *****************************
// ********* FUNCTIONS *********
// *****************************

function startApp(settings, callback) {
  console.log("Starting Email Transcript App");
}
// *****************************
// ********* FUNCTIONS *********
// *****************************
function readHTMLFile(templateName, dir, callback) {
  var perc = __dirname + dir + templateName;
  console.log("Reading file: ", perc)
  console.log("Reading __dirname: ", __dirname)
  //fs.readFile(__dirname + '/configure' + templateName, { encoding: 'utf-8' },
  fs.readFile(__dirname + dir + templateName, { encoding: 'utf-8' },
    //fs.readFile("https://accept-a-payment-app-into-chat.leomirco.repl.co/payment", { encoding: 'utf-8' },
    function(err, html) {
      if (err) {
        throw err;
        //callback(err);
      } else {
        callback(null, html)
      }
    })
}

module.exports = { router: router, startApp: startApp };