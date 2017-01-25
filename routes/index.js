var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Worker = require('./mongooseSchema');


//Mongoose Connection
mongoose.connect('mongodb://vs-mongo:vs-mongo@ds163677.mlab.com:63677/vs-nodejs-db'); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection succeeded.");
});



/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
});


router.post('/auth', function (req,res,next) {
  console.log('authentication in progress');
    var user;

    //authentifizieren
    Worker.getWorkerByUsername(req.body.username, function (err, res) {
        if(err) throw err;
        user=res;
    });

    console.log('user identified: ' + user);
    var hash = user.password;
    var auth = false;
     Worker.checkPassword(req.body.password,hash,function(err,res){
         auth=res;
         console.log('authorisation ' + auth );
     });
    if(auth==false){
        //Forbidden
        res.send(502);
    }
    else{
        var role;
        Worker.checkRole(req.body.username,function(err,res){
        role = res;
        });
        //rolle ermitteln
        if(role==0){ //rolle=manager
            res.redirect('/content/mgmtCockpit.html');  //weiterleiten
        }
        else{
            res.send('frohes Schaffen!');
        }

    }
});

module.exports = router;
