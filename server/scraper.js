var express = require('express');
var app = express();
var rp = require('request-promise');
var Store = require('./store');

module.exports = {
  scraper: function () {
    rp(
        "https://www.kimonolabs.com/api/b96ib456?apikey=Dofnbt5x3MjYmp5zR0DcemBeHaly3t1Y"
      )
      .then(function (res) {
        Store.newModel(res);
      })
      .then(function (data) {
        Store.store();
      });
  }
};
