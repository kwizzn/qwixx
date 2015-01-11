'use strict';

var express = require('express');
var exphbs  = require('express-handlebars');
var helpers = require('./templates/helpers');
var app = module.exports = express();

app.set('views', 'templates/');
app.engine('.hbs', exphbs({ layoutsDir: 'templates/layouts/', partialsDir: 'templates/partials/', defaultLayout: 'main', extname: '.hbs', helpers: helpers }));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/www'));
app.get('/', function (req, res) {
    res.render('app', {});
});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});
