const { data } = require('jquery');
const { db } = require('./database');
const firebase = require('./firebase');
const {validateLoginData, validateSignUpData, validateSignUpDataUser} = require('./validators');
const bodyparser = require('body-parser').urlencoded({extended: true});

//Login

exports.loginUser = (req, res) => {
    bodyparser;
    const user = {
        email: req.body.email,
        password: req.body.password
    }

     const { valid, errors } = validateLoginData(user);
     if(!valid) return res.json(errors);

    firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
        
         data.user.getIdToken();
        db.collection('client-users').get().then(snapshot => {
                                snapshot.docs.map(doc => {
                                    if(data.user.uid === doc.data().userId){
                                        
                                       return res.redirect('/dashboard/' +doc.data().store);
                                    }
                                });
                            });
                            db.collection('users').get().then(snapshot => {
                                                    snapshot.docs.map(doc => {
                                                        if(data.user.uid === doc.data().userId) {
                                                            var url = req.originalUrl;
                                                            url = url.split('login');
                                                            return res.redirect(url[0]+'home');
                                                        }
                                                    });
                                                });
                                                
    })
    // .then((token) => {
        
                  
    //                 db.collection('client-users').get().then(snapshot => {
    //                     snapshot.docs.map(doc => {
    //                         if(user.email === doc.data().email){
                                
    //                            return res.redirect('/dashboard/' +doc.data().store);
    //                         }
    //                     });
    //                 });
    //                 db.collection('users').get().then(snapshot => {
    //                     snapshot.docs.map(doc => {
    //                         if(user.email === doc.data().email) {
    //                             var url = req.originalUrl;
    //                             url = url.split('login');
    //                             return res.redirect(url[0]+'home');
    //                         }
    //                     });
    //                 });
                
    //    // return res.json(alert('signed in'));
    // })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            res.redirect('/login');
            console.log('Wrong password or email');
        } else {
          console.log(errorMessage);
        }
        
        console.log(errorCode);
      });
      
}

exports.signUpUser = (req, res) => {
    


    const newUser = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.telephone,
        password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		store: req.body.store
    };

    const { valid, errors } = validateSignUpData(newUser);

    if (!valid) return res.status(400).json(errors);

    let token, userId;

    db.doc(`/client-users/${newUser.store}`)
    .get()
    .then((snapshot) => {
        if(snapshot.exists) {
            return res.status(400).json({store: 'this is already taken'});
        } else {
            return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })
    .then((data) =>{
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((idtoken) => {
        token = idtoken;
        const userCredentials = {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            store: newUser.store,
            phoneNumber: newUser.phoneNumber,
            email: newUser.email,
            createAt: new Date().toISOString(),
            userId
        };
        return db
                .doc(`/client-users/${newUser.store}`)
                .set(userCredentials);
    })
    .then(() => {
        
        const successSignUp = res.redirect('/signedupsuccessfully');
        var x = console.log(req.body);
        return successSignUp;
            })
    .catch((err) => {
        console.log(err);
        if(err.code === 'auth/email-already-in-use') {
            return res.status(400).json({ email: 'Email already in use' });
        } else {
            const errorSomething = res.status(500).json({ general: 'Something went wrong, please try again' });
            const redirectSignUp = res.redirect('/signup');
            return {errorSomething, redirectSignUp};
        }
    });       
}

exports.signUpFinalUser = (req, res) => {

    

    const newUser = {
        
        email: req.body.email,
        phoneNumber: req.body.tel,
        password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		
    };

    const { valid, errors } = validateSignUpDataUser(newUser);

    if (!valid) return res.status(400).json(errors);

    let token, userId;

    db.doc(`/users/${newUser.email}`)
    .get()
    .then((snapshot) => {
        if(snapshot.exists) {
            return res.status(400).json({store: 'this is already taken'});
        } else {
            return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })
    .then((data) =>{
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((idtoken) => {
        token = idtoken;
        const userCredentials = {
            phoneNumber: newUser.phoneNumber,
            email: newUser.email,
            createAt: new Date().toISOString(),
            userId
        };
        return db
                .doc(`/users/${newUser.email}`)
                .set(userCredentials);
    })
    .then(() => {
        // const successAdding = res.status(201).json({ token });
        // const successSignUp = res.redirect('/signedupsuccessfully');
        const returnpage= res.redirect('/signedupsuccessfully');
        return {returnpage};
            })
    .catch((err) => {
        console.log(err);
        if(err.code === 'auth/email-already-in-use') {
            return res.status(400).json({ email: 'Email already in use' });
        } else {
            const errorSomething = res.status(500).json({ general: 'Something went wrong, please try again' });
            const redirectSignUp = res.redirect('/signup');
            return {errorSomething, redirectSignUp};
        }
    });     
}
    
    
   