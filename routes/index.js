var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodb =  require('mongodb');
var Schema = mongoose.Schema;
var Worker = require('./mongooseSchema');
var bcrypt = require('bcryptjs');

//Mongoose Connection
mongoose.connect('mongodb://vs-mongo:vs-mongo@ds163677.mlab.com:63677/vs-nodejs-db'); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)
//mongoose.connect('mongodb://localhost:27017/vs-nodejs-db');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection succeeded.");
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});

    var Worker = mongoose.model('Worker', eventSchema);
});


router.use(function(req, res, next) {
    console.log('Es passiert etwas...');
    next();
});

router.route('/auth')
  
.post(function(req,res){

Worker.findOne({username: req.body.username},function(err, workers){
		
		if(err)
			res.send(err);
		
		console.log(workers);
		
		bcrypt.compare(req.body.password, workers.passwd, function(err, bla) {
		if(err)
			res.send(err);
		
		res.redirect("../content/stampClock.html?MaName=" + workers.name);
		});
	});
	});

router.route('/workers')

.get(function(req,res){
	
	Worker.find(function(err, workers){
		
		if(err)
			res.send(err);
		res.json(workers);
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
		 res.json({ message: 'Mitarbeiter angelegt!' });
	});
	
});



module.exports = router;
