
const router = require('express').Router();
const firebase = require('./firebase').default;
const bodyparser = require('body-parser');


router.use(bodyparser.urlencoded({extended: true}));
router.use(bodyparser.json());

const auth = firebase.auth();

// const firstnametxt = document.getElementById('first');
// const lastnametxt = document.getElementById('last');
// const passwordtxt = document.getElementById('passsignup');
// const passwordconfirmtxt = document.getElementById('passconfirm');
// const emailtxt = document.getElementById('emailsignup');
// const teletxt = document.getElementById('tele');
// const stornametxt = document.getElementById('storname');
// const btnsinuptxt = document.getElementById('btnsignup');


router.post('/signup', (req, res) => {


    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const pass = req.body.password;
    const email = req.body.email;
    const tele = req.body.telephone;
    const storename = req.body.store;

    var id = 0;
    const dateSignup = Date.UTC;
    if(pass == req.body.confirmPassword && pass.length <= 6){
        
        const firebaseRef = firebase.database().ref().child('users');
        
        firebaseRef.child(storename).set({
            FirstName: firstname,
            LastName: lastname,
            Password: pass,
            Email: email,
            telephone: tele,
            StoreName: storename
        });

        firebaseRef.child(storename).push();

       const promise = auth.createUserWithEmailAndPassword(email, pass);
       promise.catch(e => console.log(e.message));
    }

    else {
      
        res.redirect('/signup');
    }
 
    res.redirect('/');
    
});


module.exports = router;