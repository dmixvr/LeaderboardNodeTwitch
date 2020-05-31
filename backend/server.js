var express = require('express'),
    bodyParser = require('body-parser');;
var app = express();
var path = require('path');
var mysql = require('./mysql')
var cors = require('cors')
    // viewed at http://localhost:8080

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8083);

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
    mysql.query('update puntuaciones SET Nick = ?, Puntuacion = ?, Minijuego = ? WHERE ID = ?', [req.body.Nick, req.body.Puntuacion, req.body.Minijuego, req.body.ID], function(error, results, fields) {
        if (error) console.log(error)
    });
    console.log(req.body); // your JSON
    console.log("UPDATE " + req.body.ID)
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
    mysql.query('delete from puntuaciones where id = ?', [req.body.ID], function(error, results, fields) {
        if (error != undefined) console.log(error)
    });
    console.log(req.body); // your JSON
    res.sendStatus(200)
});