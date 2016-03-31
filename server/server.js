var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var eventController = require('./controllers/eventController');
var store = require('./controllers/store');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'./../public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'/../public/index.html'));
});
// , store.modelName
app.get('/data', eventController.getData, eventController.displayE_b);


app.listen(3000, function(){
  console.log('Connected to port 3000');
});
