var express = require('express');
var router = express.Router();
var firebase = require('firebase');
//var firebaseui = require('firebaseui')
//console.log(defaultApp.name);  // "[DEFAULT]"

// Initialize the default app
var config = {
    apiKey: "AIzaSyBURU8a-pq1obeDCX5wGgWKym4qayv9vUU",
    authDomain: "verteiltesysteme-370a5.firebaseapp.com",
    databaseURL: "https://verteiltesysteme-370a5.firebaseio.com",
    storageBucket: "verteiltesysteme-370a5.appspot.com"
};
defaultApp = firebase.initializeApp(config);

//defaultStorage = firebase.storage();
//defaultDatabase = firebase.database();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/check/', function (req, res, next){

    console.log(req.body(password));

    res.send(200,"okay - check");
});

module.exports = router;
