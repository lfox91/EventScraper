var express = require('express');
var app = express();
var path = require('path');
var rp = require('request-promise');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var Scraper = require('./scraper');
var Store = require('./store');

var run1 = false;
firstRun();
function firstRun(){
  run1 = true;
  Scraper.scraper();
}

if (run1) {
  setInterval(function () {
    mongoose.connection.collections.events.drop(function (err) {
      console.log('collection dropped');
    });
    console.log("I ran on" + Date.now());
    Scraper.scraper();
  }, 60000);
}

app.get('/data', Store.find, function(req, res){
    res.send(res.data);
});
app.get('/', function(req, res){
  res.sendFile(path.resolve('./index.html'));
});
app.get('/build/bundle.js', function(req, res){
  res.sendFile(path.resolve('./build/bundle.js'));
});
app.get('/css/style.css', function(req,res){
  res.sendFile(path.resolve('./css/style.css'));
});
app.listen(3000 , function () {
  console.log('eventscraper running on port 3000!');
});
