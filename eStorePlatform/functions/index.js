// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// jshint eversion:6
// // Create and Deploy Your First Cloud Functions

const functions = require("firebase-functions");
// // https://firebase.google.com/docs/functions/write-firebase-functions

const firebase = require("firebase/app");
var firebase1 = require("firebase");
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCMVlN5Jig5hnH5It1GWOA0kILH-EL3Exc",
    authDomain: "estoreplatform-2d6f7.firebaseapp.com",
    databaseURL: "https://estoreplatform-2d6f7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "estoreplatform-2d6f7",
    storageBucket: "estoreplatform-2d6f7.appspot.com",
    messagingSenderId: "1004459441040",
    appId: "1:1004459441040:web:05cd7d03073c8549d81115",
    measurementId: "G-2V5D2MQ7R3"
};

  firebase1.initializeApp(firebaseConfig);

  let database = firebase.database();

  app.get('/', (req, res) => {

    
    res.sendFile(path.join(__dirname+"/public/index.html"));

  });

  app.get("/signup", (req, res) => {

    
    res.sendFile(path.join(__dirname +"/public/sign_up.html"));
    

  });

  app.get("/login", (req, res) => {

    
    res.sendFile(path.join(__dirname+"/public/sign_in.html"));

  });

  app.post('/login', (req, res) =>{

    res.sendFile(path.join(__dirname +"/public/client_dashboard.html"));

  })


 exports.firebase1 = functions.https.onRequest(app);
