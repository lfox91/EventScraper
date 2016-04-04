
const request = require('request');
const moment = require('moment');
const {eBToken: eBToken} = require('../../keys');

moment().format();

module.exports= {
  getData: function(req, res, next){
    'use strict';
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(3);
      tomorrow = tomorrow.toISOString();
      // TODO: remove moment.js dependence FIGURE OUT DATE OBJ!!!
      var now = moment();
      now = now.toISOString();
    request(`http://eventbriteapi.com/v3/events/search?token=${eBToken}&popular=false&venue.city=los angeles&start_date.range_start=${now.slice(0, tomorrow.indexOf('.'))}&start_date.range_end=${tomorrow.slice(0, tomorrow.indexOf('.'))}`, function(err, data){
      if(data) {
        req.eventBrite = JSON.parse(data.body).events;
        let getVenueObject = function* (eBriteArr){
          for ( let {venue_id: id} of eBriteArr){
            let i=0;
            if(id) yield [id, i];
            else continue;
            i++;
          }
        };
        let requestVenues = function(venueId){
          request(`http://eventbriteapi.com/v3/venues/${venueId}/?token=${eBToken}`, function(err, venueObj){
            if(err) console.log(err);
            console.log(venueObj.body);
          });
        };
        for (var [venueId,index] of getVenueObject(req.eventBrite)) {
          console.log("ID: ",venueId, "index: ", index);
          if(venueId){
            requestVenues(venueId);
          } else {
            req.eventBrite.splice(index,1);
          }
        }
        // getVenueObject.next();
        next();
      } else {
        console.log(err);
      }
    });
  },
  //purely for testing purposes
  displayE_b: function(req, res){
    res.json(req.eventBrite);
  }
};
