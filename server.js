//
var http = require('http');
var path = require('path');
const express = require('express')


const app = express()
const server = http.createServer(app);

//using ejs
app.set('view engine', 'ejs')

//using static files like css and js
app.use(express.static('public'));


app.get('/', function (req, res) {
  var myjumbotext = "This is a starter kit with Express, Embedded JS (EJS), Node.js and Bootstrap-4.0.0"
  res.render('pages/index',{metatitle:"Starter Kit Title",myjumbotitle:"Hello World",myjumbotext:myjumbotext});
})

// for post

app.post('/', function (req, res) {
 res.render('pages/index',{metatitle:"My App Title",myvariable1:"myvariable"});
})
// API
app.get('/api', function (req, res) {
 res.json({ message: 'Express-Starter-Kit API response at site/api/' }); 
})


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("node starter kit server listening at", addr.address + ":" + addr.port);
});
