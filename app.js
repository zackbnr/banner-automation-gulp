var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('hello world');
});

app.get('/banners', function(req, res) {
    var file = fs.readFileSync(__dirname + '/banners.json', 'utf8');
    res.json(JSON.parse(file));
});

var server = app.listen(process.env.PORT || 1337, function() {
    console.log('App is listening.');
});
