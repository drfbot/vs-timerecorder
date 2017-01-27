var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodb =  require('mongodb');
var Schema = mongoose.Schema;
var Worker = require('./mongooseSchema');

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

/* ### EDIT MOE ###

router.use(function(req, res, next) {
    console.log('Es passiert etwas...');
    next();
});

router.get('/', function(req,res){
	
	res.json({message: 'Willkommen zur API!'})
	
})


 === END MOE === */

router.post('/auth', function (req, res) {
        Worker.findOne({'username':req.body.username}, function (err, obj) {
            if (err || !obj) {
                res.send(500);
                console.log("error: " + err + ", obj: " + obj);
                return;
            }

            console.log("obj: " + obj);


            Worker.checkPassword(req.body.password,obj.passwd, function (err,pwBool) {
                if (err || !obj) {
                    res.send(500);
                    console.log("error: " + err + ", obj: " + obj);
                    return;
                }

                if(pwBool){
                    console.log('successful authentication');
                    res.redirect('/content/mgmtCockpit.html');
                }
                else{
                    console.log('unsuccessful authentication');
                    res.write('not! res');
                }
            });

//ende! -> 'res' wurde bereits angesprochen.
        });
    });

/*  #### EDIT MOE ####
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
	==== END EDIT MOE ====*/ 
	
	
/* #### EDIT MOE ####
router.route('/workers')

.get(function(req,res){
	
	Worker.find(function(err, workers){
		
		if(err)
			res.send(err);
		res.json(workers);
	});
	
});

	====END EDIT MOE ====*/	
	
module.exports = router;
