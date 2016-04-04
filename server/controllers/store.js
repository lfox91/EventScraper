var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(
  "mongodb://Fox:ilovetesting@ds056998.mongolab.com:56998/eventscraper");
var db = mongoose.connection;
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  eventLink: String,
  eventName: String,
  eventDescription: String,
  eventDate: String,
  eventLocation: String,
  siteURL: String,
  imgURL: String
});


var Event = mongoose.model('Event', eventSchema);

var store = {

  modelArr: [],
  newModel: function (req, res, next) {
    for (var events of req.e_b) {
      modelName = "e_b" + k;
      store.modelArr.push(
        modelName = new Event({
          eventLink: req.e_b[k].eventName.href,
          eventName: req.e_b[k].name.text,
          eventDescription: req.e_b[k].description.text,
          eventDate: req.e_b[k].eventDate,
          eventLocation: req.e_b[k].eventLocation,
          siteURL: req.e_b[k].url
        })
      );
    }
  },
  store: function () {
    function error(err, model) {
      if (err) return console.error(err);
    }
    for (var k in store.modelArr) {
      store.modelArr[k].save(error);
    }
  }

};



module.exports = store;
