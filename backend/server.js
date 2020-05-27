var express = require('express');
var app = express();
var path = require('path');
var mysql = require('./mysql')
var cors = require('cors')
    // viewed at http://localhost:8080

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8081);
app.use(cors())


app.get('/api/leaderboard/:id', function(req, res) {
    var id = req.params.id;
    if (id == undefined) id = 1;
    mysql.query('SELECT * from puntuaciones where minijuego = ' + req.params.id, function(error, results, fields) {
        if (error) throw error;
        res.json(results)
    });
});