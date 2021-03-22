
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const firebase = require('./firebase');
const router = require('./auth');


app.use('/', router);

app.get('/', (req, res) => {

    
    res.sendFile(path.join(__dirname+"/public/index.html"));

});

app.get('/signin', (req, res) => {

    
  res.sendFile(path.join(__dirname+"/public/sign_in.html"));

});

app.get('/sinup', (req, res) => {

    
  res.sendFile(path.join(__dirname+"/public/sign_up.html"));

});

 exports.firebase = functions.https.onRequest(app);
