var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});


app.set('view engine', 'ejs');

app.use(express.static('./static'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/save', function (req, res) {
    res.send('save user');
});

app.post('/addUser', parser, function (req, res) {
    console.log(req.body);
    res.send('save user');
});


app.listen(7777);
console.log('Server started at localhost:7777');