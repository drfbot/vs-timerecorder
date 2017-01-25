var express = require('express');
var router = express.Router();
var mongoose = require('./mongooseSchema');
var Worker = require('./mongooseSchema');
var bodyParser = require('body-parser');
//console.log(defaultApp.name);  // "[DEFAULT]"

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/check/', function (req, res, next){

    console.log(req.body(password));

    res.send(200,"okay - check");
});


//noch nicht angesteuerte Route für das Management zur Nutzereintragung
router.post('/create', function (req , res) {
    // Create Worker
    //console.dir(req);
    //console.log('entered: '+ req.body.password +' '+ req.body.username);

    //cryptomagic
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSalt(10, function(err, salt) {
        if(err){
            console.log('salt '+ salt);
            console.log('problem salting the hash ' + req.body.password);
        }
    });

    var hash = bcrypt.hashSync(req.body.password,salt);

    var worker = new Worker({
        username: req.body.username
        , name: req.body.name
        , passwd: hash //hash
        , role: req.body.role
        , sessionToken: req.body.sessionToken //später autogeneriert
        , contract: req.body.contract
        , debit: 1
        , credit: 1
        , vacation: 1
        , illness: 3
    }).save(function (err) {
        console.log("saved");
        if (err) {
            console.log(err);
        }});

    console.log(worker);
    res.redirect('/content/mgmtCockpit.html')
});

module.exports = router;
