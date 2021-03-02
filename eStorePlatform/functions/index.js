// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// jshint eversion:6
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require("firebase-functions");
const firebase = require("firebase/app");
const express = require("express");
const app = express();

require("firebase/auth");
require("firebase/firestore");
require("firebase/database");


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const Config = {
    apiKey: "AIzaSyA-v2ebt30MEp9nU2PBtdGKwYPYu41Hioo",
    authDomain: "estore-platform.firebaseapp.com",
    databaseURL: "https://estore-platform-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "estore-platform",
    storageBucket: "estore-platform.appspot.com",
    messagingSenderId: "663183096844",
    appId: "1:663183096844:web:4559c7a937e08ec647c229",
    measurementId: "G-P78DELXHE2"
  };

  firebase.initializeApp(Config);

  const database = firebase.database();

  app.get("/", (req, res) => {

    res.send("Hello");

  });

 exports.app = functions.https.onRequest(app);
