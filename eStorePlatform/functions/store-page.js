const database = require('./database');
const firebase = require('./firebase');

const logotxt = document.getElementById('logo');
const hometxt = document.getElementById('home');
const conttxt = document.getElementById('cont');

    const change = function UserRet(logo, home){


           logotxt.innerHTML = "logo";
           hometxt.setAttribute('href', home);

   }

   firebase.database().ref('users').once('value', (snapshot) => {
    snapshot.forEach(
      (ChildSnapshot) => {

     change(ChildSnapshot.val().StoreName, '/' + ChildSnapshot.val().StoreName);
     app.get('/' + ChildSnapshot.val().StoreName,(req, res) => {

     
        res.sendFile(path.join(__dirname+"/public/store_page.html"));
      
           });
        
      })

    });
           module.exports = change;