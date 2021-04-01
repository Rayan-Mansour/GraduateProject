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
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const { getMaxListeners } = require("process");
require("dotenv").config();


app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
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


                                               // contact us side

app.get('/contactus', (req,res) =>{

          res.sendFile(path.join(__dirname+"/public/contact-us.html"));


  })

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  port: 587,
  auth: {
    user: 'sewwrg@gmail.com',
    pass: 'hgfrld911',
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('error ya wld');
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  //1.
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    //2. You can configure the object however you want
    const mail = {
      from: data.email,
      to: 'rveercee.15@gmail.com',
      subject: data.subject,
      text: `<${data.email}> \n${data.message}`,
    };

    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
        res.redirect('back');
      }
    });
  });
});


//                             contact us side end



app.listen(3000);

 exports.firebase = functions.https.onRequest(app);
 