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
    for (var events of req.eventBrite) {
      modelName = "eventBrite_" + events;
      store.modelArr.push(
        modelName = new Event({
          // eventLink: events.eventName.href,
          eventName: events.name.text,
          eventDescription: events.description.text,
          // eventDate: events.eventDate,
          eventLocation: req.eBVenues[events.venue_id],
          siteURL: events.url
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
