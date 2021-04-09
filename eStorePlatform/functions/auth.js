
const router = require('express').Router();
 const firebase = require('./firebase');
const bodyparser = require('body-parser');
 const { db } = require('./database');
// const { data } = require('jquery');




router.use(bodyparser.urlencoded({extended: true}));
router.use(bodyparser.json());


//const auth = firebase.auth();

// const firstnametxt = document.getElementById('first');
// const lastnametxt = document.getElementById('last');
// const passwordtxt = document.getElementById('passsignup');
// const passwordconfirmtxt = document.getElementById('passconfirm');
// const emailtxt = document.getElementById('emailsignup');
// const teletxt = document.getElementById('tele');
// const stornametxt = document.getElementById('storname');
// const btnsinuptxt = document.getElementById('btnsignup');


// router.post('/signup', (req, res) => {


//     const files = [];
//     const firstname = req.body.firstname;
//     const lastname = req.body.lastname;
//     const pass = req.body.password;
//     const email = req.body.email;
//     const tele = req.body.telephone;
//     const storename = req.body.store;
    
    
//     files[0] = image;

//     var id = 0;
    
//     const dateSignup = new Date();
//     const dateNow = dateSignup.getFullYear() + '-' + (dateSignup.getMonth()+1) + '-' + dateSignup.getDate() + ' ' + dateSignup.getHours() +':'
//                                             + dateSignup.getMinutes()+':'+ dateSignup.getSeconds();
//     if(pass === req.body.confirmPassword){
        
//         const firebaseRef = db.ref('users');
        

//              firebaseRef.child(storename).set({
//             FirstName: firstname,
//             LastName: lastname,
//             Password: pass,
//             Email: email,
//             telephone: tele,
//             StoreName: storename,
//             date: dateNow
//         });

//        const promise = auth.createUserWithEmailAndPassword(email, pass);
//        promise.catch(e => console.log(e.message));

        
//     }

//     else {
      
//         res.redirect('/signup');
//         res.render(window.alert('password less than 6 digits'));
//     }
 
//     res.redirect('/signedupsuccessfully');
    
// });

router.post('/login', loginUser);
router.post('/signup', signUpUser);

module.exports = router;