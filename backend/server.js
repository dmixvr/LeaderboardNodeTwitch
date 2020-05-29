var express = require('express'),
    bodyParser = require('body-parser');;
var app = express();
var path = require('path');
var mysql = require('./mysql')
var cors = require('cors')
    // viewed at http://localhost:8080

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8081);

app.use(cors())
app.use(bodyParser.json());

app.get('/api/leaderboard/:id', function(req, res) {
    var id = req.params.id;
    if (id == undefined) id = 1;
    mysql.query('SELECT * from puntuaciones where minijuego = ' + req.params.id + ' order by Puntuacion DESC', function(error, results, fields) {
        if (error != undefined) console.log(error)
        res.json(results)
    });
});

app.post('/api/leaderboard/update', function(req, res) {
    mysql.query('UPDATE puntuaciones SET Nick = ?, Puntuacion = ?, Minijuego = ? WHERE Nick = ?', [req.body.Nick, req.body.Puntuacion, req.body.Minijuego, req.body.Nick], function(error, results, fields) {
        if (error != undefined) console.log(error)
    });
    console.log(req.body); // your JSON
    res.sendStatus(200)
});

app.post('/api/leaderboard/insert', function(req, res) {
    mysql.query('insert into puntuaciones (Nick,Puntuacion,Minijuego) values(?,?,?)', [req.body.Nick, req.body.Puntuacion, req.body.Minijuego], function(error, results, fields) {
        if (error != undefined) console.log(error)
    });
    console.log(req.body); // your JSON
    res.sendStatus(200)
});

app.post('/api/leaderboard/delete', function(req, res) {
    mysql.query('delete from puntuaciones where Nick = ?', [req.body.Nick], function(error, results, fields) {
        if (error != undefined) console.log(error)
    });
    console.log(req.body); // your JSON
    res.sendStatus(200)
});