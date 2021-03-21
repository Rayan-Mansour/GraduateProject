/*eslint-env browser*/
const router = require('express').Router();
const firebase = require('./firebase').default;
const bodyparser = require('body-parser');


router.use(bodyparser.urlencoded({extended: true}));
//router.use(router.static(__dirname + "/public"));
const auth = firebase.auth();

const firstnametxt = document.getElementById('first');
const lastnametxt = document.getElementById('last');
const passwordtxt = document.getElementById('passsignup');
const passwordconfirmtxt = document.getElementById('passconfirm');
const emailtxt = document.getElementById('emailsignup');
const teletxt = document.getElementById('tele');
const stornametxt = document.getElementById('storname');
const btnsinuptxt = document.getElementById('btnsignup');


router.post('signup', (req, res) => {


    const firstname = firstnametxt.value;
    const lastname = lastnametxt.value;
    const pass = passwordtxt.value;
    const email = emailtxt.value;
    const tele = teletxt.value;
    const storename = stornametxt.value;
    var id = id++;
    const dateSignup = Date.UTC;
    if(pass.value == passwordconfirmtxt.value){
        
        firebase.database().ref('Users').set({

           ID: id,
           FirstName: firstname,
           LastName: lastname,
           Password: pass,
           Email: email,
           telephone: tele,
           StoreName: storename

        });

       const promise = auth.createUserWithEmailAndPassword(email, pass);
       promise.catch(e => console.log(e.message));
    }

    else {
        res.send(prompt('there is error happened! sorry try again!'));
        res.redirect('/signup');
    }

    res.send(prompt('Sign up success! you will back to Home screen!'));
    res.redirect('/');
    
});


module.exports = reouter;