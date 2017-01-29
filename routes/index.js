var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodb =  require('mongodb');
var Schema = mongoose.Schema;
var Worker = require('./mongooseSchema');
var Timer = require('./mongooseSchema');

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

            if(err)res.send(err);
            console.log(workers);

            bcrypt.compare(req.body.password, workers.passwd, function(err, pwBool) {
                if(err)
                    res.send(err);
                if(pwBool)
                    res.redirect("../content/stampClock.html?MaName=" + workers.name+'&username='+workers.username);
            });
        });
    });

        /*if(pwBool){
            console.log("successful authentication");
            res.redirect('../content/mgmtCockpit.html?MaName='+workers.name);
        }
        else res.write('NOT a valid user');
        });
    });
});*/

router.route('/workers')

.get(function(req,res){

	Worker.find(function(err, workers){

		if(err)
			res.send(err);
		res.json(workers);
	});

});

router.route('/checkin')

.get( function (req,res) {
    //stampclock
    console.log("checkin: "+ req.param('username'));

    Worker.findOne({'username': req.param('username')}, function (err, obj) {
        if (err || !obj) {
            res.sendStatus(500);
            console.log("error: " + err + ", obj: " + obj);
            return;
        }

        if (obj.loginstate) {
            //logout
            Timer.find({username:obj.username}, function (err,res) {

                if(res.clockOut==null){

                    //set clockout
                    console.log("set clockout!");
                    res.clockOut=Date.now();

                    //update workerflag
                    console.log("set workerflag");
                    Worker.findOneAndUpdate({username:obj.username}, {loginstate:false} , {upsert: true}, function (err, callback) {
                        if (err || !callback) {
                            return res.sendStatus(500);

                        } else {
                            console.log("updateCallback " + callback);
                            res.write('Have a nice day!');//somewhere
                        }
                    });
                }
            })
        }
        else {
            //login timestamp
            console.log('checkin active - user timestamp renewal');
            //new TimeSchema
            var newTimer = new Timer();
            newTimer.MA_id=obj.username;
            newTimer.clockIn=Date.now();
            newTimer.clockOut=null;
            newTimer.save(function (err){

                if(err){
                    res.send(err);
                }
            });
            //set loginstate
            console.log("set loginstate -> true");

            Worker.findOneAndUpdate({username:obj.username}, {loginstate:true} , {upsert: true}, function (err, callback) {
                if (err || !callback) {
                    return res.sendStatus(500);

                } else {
                    console.log("updateCallback " + callback);
                    res.redirect('/content/mgmtCockpit.html');
                }
            });

            


            /*var query = {"username": req.params('username')};
            var insert = {"timestamp": Date.now()};
            console.log("timestamp " + Date.now());

            Worker.findOneAndUpdate(query, insert, {upsert: true}, function (err, callback) {
                if (err || !callback) {
                    return res.sendStatus(500);

                } else {
                    console.log("updateCallback " + callback);
                    res.write('Have a nice day!');//somewhere
                }
            });*/
        }
    });
});


module.exports = router;
