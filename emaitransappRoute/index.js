"use strict";
const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
require('dotenv').config();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const { TiledeskClient } = require('@tiledesk/tiledesk-client');
var assert = require('assert');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const pjson = require('./package.json');
// import node-fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
  fetch(...args));
const { resolve } = require('path');
// Replace if using a different env file or config
const env = require('dotenv').config({ path: './.env' });

router.use(express.static(path.join(__dirname, 'template')));
// ENVIROMNENT VARIABLE
var SERVER_BASE_URL = process.env.SERVER_BASE_URL;




router.get('/', async (req, res) => {
  console.log(req.baseUrl)
  res.send('Home works!')
})

router.get('/create-mail', async (req, res) => {
  var page = '';
  var dir = '';
  //READ THE CONFIGURATION FILE
  console.log('req query ', req.query);
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
        server_base_url: SERVER_BASE_URL,
      }
      if (log) {
        console.log("Replacements: ", replacements);
      }
      var html = template(replacements);
      res.send(html);
    })
  }
});

router.get('/info', async (req, res) => {
  console.log('READ APP Stripe Info');
  console.log('Request query: ', req.query);
  var projectId = req.query.projectId;
  var log = false;
  var page = '/info.html';
  var dir = '/template';
  readHTMLFile(page, dir, (err, html) => {
    if (err) {
      console.log("(ERROR) Read html file: ", err);
    }
    var template = handlebars.compile(html);
    var replacements = {
    }
    if (log) {
      console.log("Replacements: ", replacements);
    }
    var html = template(replacements);
    res.send(html);
  })
})

router.get('/detail', async (req, res) => {
  console.log('READ APP Stripe Info');
  console.log('Request query: ', req.query);
  var projectId = req.query.projectId;
  var log = false;
  var page = '/detail.html';
  var dir = '/template';
  readHTMLFile(page, dir, (err, html) => {
    if (err) {
      console.log("(ERROR) Read html file: ", err);
    }
    var template = handlebars.compile(html);
    var replacements = {
    }
    if (log) {
      console.log("Replacements: ", replacements);
    }
    var html = template(replacements);
    res.send(html);
  })
})

// *****************************
// ********* FUNCTIONS *********
// *****************************
function readHTMLFile(templateName, dir, callback) {
  var perc = __dirname + dir + templateName;
  console.log("Reading file: ", perc)
  console.log("Reading __dirname: ", __dirname)
  fs.readFile(__dirname + dir + templateName, { encoding: 'utf-8' },
    function(err, html) {
      if (err) {
        throw err;
      } else {
        callback(null, html)
      }
    })
}

module.exports = router;
