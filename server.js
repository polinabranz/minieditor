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

server.put('/api/site', function (req, res) {
    requestBody = req.body;
    var file = JSON.parse(fs.readFileSync ('NewSite.json','utf-8'));
    var counter = file.idCounter;
    var sites = file.sites;

    requestBody.id = "pol" + counter;
    counter = counter + 1;
    sites.push(requestBody);

    file.idCounter = counter;
    file.sites = sites;

    var JSONString = JSON.stringify(file);

    fs.writeFileSync('NewSite.json', JSONString, 'utf-8');
    console.log(requestBody);
    res.status(200);
    res.send('OK');
});

server.get('/api/site', function (req, res) {
    var JSONSite = JSON.parse(fs.readFileSync('NewSite.json', 'utf-8'));
    res.send(JSONSite.sites);
});

server.get('/api/site/:siteId', function(req,res){
    var siteId = req.params.siteId;
    var JSONSite = JSON.parse(fs.readFileSync('NewSite.json', 'utf-8'));
    var sitesArray = JSONSite.sites;
    var siteContent = sitesArray.filter(x =>x.id === siteId);
    res.send(siteContent[0]);
})

server.get('/viewer/:siteId', function (req, res) {
    var siteId = req.params.siteId;
    

    var viewer = fs.readFileSync('Viewer.html', 'utf-8');
    var viewer = viewer.replace("$TITLE$", requestBody.title).replace("$CONTENT$", requestBody.content);
    res.status(200);
    res.send(viewer);
});

server.listen(port);
