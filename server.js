var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false});

let userStorage = [];

app.set('view engine', 'ejs');

app.use(express.static('./static'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/save', function (req, res) {
    res.send('save user');
});

app.post('/addUser', parser, function (req, res) {
    userStorage.push(req.body);
    res.send(userStorage);
});

app.post('/updateUser', parser, function (req, res) {
    var id = req.body.idEdit;
    userStorage[id] = {
        name: req.body.name,
        age: req.body.age,
        skill: req.body.skill
    };
    res.send(userStorage);
});

app.post('/deleteUser', parser, function (req, res) {
    userStorage.splice(req.body.idDelete, 1);
    res.send(userStorage);
});


app.listen(7777);
console.log('Server started at localhost:7777');