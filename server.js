//var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var server = express();
var requestBody;
var test = 'save';
var port = process.env.PORT || 8080;

server.use(bodyParser.json());


server.get('/', function (req, res) {
    var client = fs.readFileSync('client.html', 'utf-8');
    res.status(200);
    res.send(client);
});

server.get('/favicon.ico', function (req, res) {
    res.status(204);
});

server.put('/put', function (req, res) {
    requestBody = req.body;
    console.log(requestBody);
    res.status(200);
    res.send('OK');
});

server.get('/viewer', function (req, res) {
    var viewer = fs.readFileSync('Viewer.html', 'utf-8');
    var viewer = viewer.replace("$TITLE$", requestBody.title).replace("$CONTENT$", requestBody.content);
    res.status(200);
    res.send(viewer);
});

server.listen(port);
