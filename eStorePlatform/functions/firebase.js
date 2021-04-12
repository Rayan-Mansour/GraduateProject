


var firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");
require("firebase/database");
require("firebase/storage");
require("firebase-admin");

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

  firebase.default.initializeApp(firebaseConfig);

  module.exports = firebase.default;