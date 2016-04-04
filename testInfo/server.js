'use strict'

const express= require('express');
const app = express();
const request = require('request');
const wfa = new require('word-frequency-analyzer');

app.get('/', function(req, res){
  var options = {
    method: 'GET',
    url: 'http://eventbriteapi.com/v3/events/search',
    qs:
    { token: '6T676TGB25H64INU24DA',
     popular: 'false',
     'venue.city': 'los angeles',
     'start_date.range_end': '2016-02-09T03:00:00' },
    headers:
    { 'postman-token': '0ed49018-c19b-3a3e-8719-2796746cae1e',
     'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      body = JSON.parse(body);
      // console.log(body.events);
      var textArr = [];
      for( var k of body.events){
        // console.log(k);
        textArr.push(k.description.text);
      }
      // console.log(textArr);
        res.send(textArr.join());
    });

  });

app.listen(3000, function(){
  console.log('listening...');
});
