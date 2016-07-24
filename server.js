var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'mydbinstance.abcdefghijkl.us-west-2.rds.amazonaws.com',
  user     : 'sa',
  password : 'mypassword',
  port: '3306'
});

connection.connect();

app.use('/', express.static(__dirname + '/public'));

app.get('/test', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('GET request to the homepage');
  
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    
    console.log('The solution is: ', rows[0].solution);
  });
});

app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});