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
const { db } = require('./database');
// const router = require('./auth');
const { loginUser } = require('./users');
const { signUpUser, signUpFinalUser } = require('./users')
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const auth = require("firebase-admin");
//const { getMaxListeners } = require("process");
//const { request } = require("http");
require("dotenv").config();



app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());



app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname+"/public/index.html"));

});



db.collection('client-users').get().then(snapshot => {
  snapshot.docs.map(doc => {
      app.get('/dashboard/' + doc.data().store, (req, res) => {

         
        res.sendFile(__dirname+"/public/client_dashboard.html");
      
                          });
  });
});

   db.collection('client-users').get().then(snapshot => {

      snapshot.docs.map(doc => {
        
        app.get('/' + doc.data().store, (req, res) => {
                
                  res.sendFile(path.join(__dirname+"/public/store_page.html"));

         })

          

        app.get('/' + doc.data().store + '/cart', (req, res) => {
          
            res.sendFile(path.join(__dirname+"/public/cart.html"));
                              
        });

        app.get('/'+ doc.data().store+'/home', (req, res) => {
          res.sendFile(path.join(__dirname+"/public/store_page_logged_in.html"));
        })
      });
      });
   
   
   db.collection('client-users').get().then(snapshot => {

    snapshot.docs.map(doc => {
      
      app.get('/dashboard/' + doc.data().store + '/products', (req, res) => {

       
      res.sendFile(path.join(__dirname+"/public/clientdash-product.html"));

           });

           app.get('/dashboard/' + doc.data().store + '/orders', (req, res) => {

       
            res.sendFile(path.join(__dirname+"/public/clientdash-Order.html"));
      
                 });

                 
          });
      });

 

   db.collection('client-users').get().then(snapshot => {
    snapshot.docs.map(doc => {
  app.get('/' + doc.data().store +'/login', (req, res) => {
    res.sendFile(path.join(__dirname+"/public/sign_in_user.html"));
  });
    });
});

app.get('/login', (req, res) => {

    
  res.sendFile(path.join(__dirname+"/public/sign_in.html"));

});

app.get('/signup', (req, res) => {

    
  res.sendFile(path.join(__dirname+"/public/sign_up.html"));

});

app.get('/signedupsuccessfully', (req,res) =>{


  res.sendFile(path.join(__dirname+"/public/SignedUpSuccessfully.html"));

});

db.collection('client-users').get().then(snapshot => {
            snapshot.docs.map(doc => {
          app.get('/' + doc.data().store +'/signupuser', (req, res) => {
            res.sendFile(path.join(__dirname+"/public/signup_cust.html"));
          });
            });
});

app.post('/login', loginUser);
app.post('/signup', signUpUser);
//app.post('/signupuser', signUpFinalUser);

db.collection('client-users').get().then(snapshot => {
  snapshot.docs.map(doc => {
  //  app.post('/' + doc.data().store +'/login', loginUser);
  });
});

db.collection('client-users').get().then(snapshot => {
  snapshot.docs.map(doc => {
    app.post('/' + doc.data().store +'/signupuser', signUpFinalUser);
  });
});



                                               // contact us side

app.get('/contactus', (req,res) =>{

          res.sendFile(path.join(__dirname+"/public/contact-us.html"));


  });



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with your email provider
  port: 587,
  auth: {
    user: 'dffx12qzm@gmail.com',
    pass: 'hgfrld+911',
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Server is ready to take our messages");
  }
});

var issueBefore;
app.post("/contactus", (req, res) => {
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
      to: 'sewwrg@gmail.com',
      subject: data.subject,
      text: `<${data.email}> \n${data.message}`,
    };

    
    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
         res.redirect('/');
      }
    });
    
       
  });
});

var issueAfter = issueBefore;
//                             contact us side end

function rand(min, max) {
  let randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum);
}

var generatorIssuesNo = () => {
  var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var issueNo = '#';
  // we will generate hex color with 6 digit length
  for (var i = 0; i < 6; i++) {
      let index = rand(0,9);
     // Append hex value at the index
     issueNo += hex[index];
  }
  return issueNo;

}

app.listen(3000);

 exports.app = functions.https.onRequest(app);
 