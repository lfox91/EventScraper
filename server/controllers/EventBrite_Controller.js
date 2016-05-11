const request = require('request');
const async = require('async');
const eBToken = require('../../keys').eBToken;

module.exports = {
  getData: function(req, res, next){
    'use strict';

    // get today's date and time
    let tomorrow = new Date();

    //add one day i.e tomorrow
    tomorrow.setDate(tomorrow.getDate() + 1);

    // set for tomorrow at 3am
    tomorrow.setHours(3);
    tomorrow = tomorrow.toISOString();
    let now = new Date();
    now = now.toISOString();


    async.waterfall([
      getEbData,
      makeVenueArr,
      getVenueObjs
      ],
      function(err,result){
        if(err) {
          console.log(err);
        } else {
          console.log(result);
        }
        next();
      }
    );

    function getEbData(callback) {
      console.log(1)
      let earl = `http://eventbriteapi.com/v3/events/search?token=${eBToken}&popular=false&venue.city=los angeles&start_date.range_start=${now.slice(0, tomorrow.indexOf('.'))}&start_date.range_end=${tomorrow.slice(0, tomorrow.indexOf('.'))}`;

      request(earl, function(err, data) {
        let eventsObj = JSON.parse(data.body).events;
        req.eventBrite = eventsObj;
        callback(err, eventsObj);
      });
    }

    function makeVenueArr(eventsArr, callback) {
      console.log(2);
      let venueFuncs = [];
      req.eventBrite.venues = [];
      eventsArr.forEach(el=>{
        let vID = el.venue_id;

        venueFuncs.push(
          function(seriesCallback){
            let earl = `http://eventbriteapi.com/v3/venues/${vID}/?token=${eBToken}`;
            request(earl, function(err, venueObj){
              let venue = {};
              venue[vID] = JSON.parse(venueObj.body);
              req.eventBrite.venues.push(venue);
              if(err){
                seriesCallback(err);
              } else {
                seriesCallback(null, venueObj.body);
              }
            });
          });
        });
      callback(null, venueFuncs);
    }

    function getVenueObjs(venueFuncs, callback) {
      console.log(3);
      async.series(venueFuncs, function(err, success){
        if (err){
          callback(err);
        } else {
          console.log('series finished');
          callback(null, 'finished');
        }
      });
    }
  },
  //purely for testing purposes
  displayE_b: function(req, res){
    console.log(req.eventBrite.venues);
    res.send(req.eventBrite.venues);
  }
};
