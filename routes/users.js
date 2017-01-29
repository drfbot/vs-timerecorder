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


router.route('/worker/remove')

.post(function(req,res){

    Worker.deleteUserByUsername(req.body.username, function (err, res) {
        console.log("delUser");
      if(err) throw err;
        res.redirect('/content/mgmtCockpit.html');
    });

});

router.route('/worker/add')

    .post(function(req,res){

        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSalt(10, function(err, salt) {
            if(err){
                console.log('salt '+ salt);
                console.log('problem salting the hash ' + req.body.password);
            }
        });

        var hash = bcrypt.hashSync(req.body.password,salt);


        var newWorker = new Worker();
        newWorker.username = req.body.username;
        newWorker.name = req.body.name;
        newWorker.passwd = hash;
        newWorker.gender = req.body.gender;
        newWorker.timestamp= null;//empty
        newWorker.loginstate=false;
        newWorker.role = req.body.role;
        // IF no Picture use Gender Picture
        newWorker.portrait = req.body.portrait;
        // newWorker.sessionToken = req.body.;
        newWorker.contract = req.body.contract;
        newWorker.startDate = req.body.startDate;
        newWorker.endDate = req.body.endDate;
        newWorker.debit = req.body.debit;
        newWorker.credit = 0;
        newWorker.vacation = req.body.vacation;
        newWorker.vacationState = false;
        newWorker.illness = 0;
        newWorker.illnessState  = false;
        newWorker.street = req.body.street;
        newWorker.postalcode = req.body.postalcode;
        newWorker.city = req.body.city;
        newWorker.phone = req.body.phone;

        newWorker.save(function (err){

            if(err){
                res.send(err);
            }
            res.redirect('/content/mgmtCockpit.html');
        });
});

module.exports = router;
