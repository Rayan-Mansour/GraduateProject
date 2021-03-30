// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// jshint eversion:6
// // Create and Deploy Your First Cloud Functions

const functions = require("firebase-functions");
// // https://firebase.google.com/docs/functions/write-firebase-functions
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const firebase = require('./firebase');
const router = require('./auth');


app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/', router);

app.get('/', (req, res) => {

    
    res.sendFile(path.join(__dirname+"/public/index.html"));

});


function FetchAll() {
  firebase.database().ref('users').once('value', (snapshot) => {
  snapshot.forEach(
    (ChildSnapshot) => {

     app.get('/' + ChildSnapshot.val().StoreName,(req, res) => {

     
  res.sendFile(path.join(__dirname+"/public/store_page.html"));

                    });
    }) 
});
}

FetchAll();

app.get('/login', (req, res) => {

    
  res.sendFile(path.join(__dirname+"/public/sign_in.html"));

});

app.get('/signup', (req, res) => {

    
  res.sendFile(path.join(__dirname+"/public/sign_up.html"));

});

app.get('/signedupsuccessfully', (req,res) =>{


  res.sendFile(path.join(__dirname+"/public/signedupsuccessfully.html"));

});

app.listen(3000);

 exports.firebase = functions.https.onRequest(app);
 