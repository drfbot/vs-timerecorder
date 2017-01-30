var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodb =  require('mongodb');
var Schema = mongoose.Schema;
var Worker = require('./mongooseSchema');
var Timer = require('./mongooseTimeSchema');
var fs = require('fs');
var bcrypt = require('bcryptjs');

//Mongoose Connection
mongoose.connect('mongodb://vs-mongo:vs-mongo@ds163677.mlab.com:63677/vs-nodejs-db'); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)
//mongoose.connect('mongodb://localhost:27017/vs-nodejs-db');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection succeeded.");
});

  
  function getReadableHours(data){
	date = new Date (data);
  var hours = date.getHours();
  var minutes = 0 + date.getMinutes();
	  minutes =  minutes/60
	  
	  return parseFloat(hours+minutes , 3);
  }


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});

    var Worker = mongoose.model('Worker', eventSchema);
});

router.use(function(req, res, next) {
    console.log('Es passiert etwas...');
	// Add headers

    // Pass to next layer of middleware
    next();
});

router.route('/auth')
    .post(function(req,res){

        Worker.findOne({username: req.body.username},function(err, workers){

            if(err) res.redirect('/');
            

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
          Timer.find({MA_id:obj.username}, function (err,ts) {

                console.dir("pre res: " +ts);
                console.log(" clockIN log: "+ts[0].clockOut);
                console.log(" clockOUT log: "+ts[0].clockIn);
                //var set =JSON.parse(ts["clockOut"]);


                for(var i=0;i<ts.length;i++){
                    console.log("in for");
                    if(ts[i].clockOut===0){
                        console.log("finding on positioin "+i);
                        //set clockout
                        var clockOutTime=Date.now();
                        var calcWorkingTimeDay = ((clockOutTime-ts[i].clockIn)*1000*60*60); //seconds/*minutes/*hours => in hours
                        var objCredit = obj.credit += calcWorkingTimeDay;
                        console.log('objcredit: '+obj.credit);
                        console.log('calcDay: '+calcWorkingTimeDay);

                        //update workerflag
                        console.log("set workerflag");

                        Worker.findOneAndUpdate({username:obj.username}, {loginstate: false} , {upsert: true}, function (err, callback) {
                            console.log('update: loginstate');
                            if (err || !callback) {
                                res.sendStatus(500);
                            }
                        });

                        Worker.findOneAndUpdate({username:obj.username}, {credit: objCredit} , {upsert: true}, function (err, callback){
                            console.log('update: credit '+ objCredit);
                            if (err || !callback) {
                                throw(err);
                            }
                        });

                        Timer.findOneAndUpdate({MA_id:ts[i].MA_id, clockOut:0},{clockOut:clockOutTime},{upsert: true}, function (err,callback) {
                            console.log("update clockout: "+ clockOutTime);
                            if (err || !callback) {
                                throw(err);
                            }
                        });
                        console.log("ende if");
                    //    return;
                    }
                    else{
                        console.log("no match");
                    }

                   }//ende for
                   ts=null;
                 //
                    //changeButton(obj.loginstate);
                  //res.sendFile('../index.html', {root: __dirname});
                  //res.write("Danke! Bis morgen dann. Pünktlich und gewaschen.");
               });
        }
        else {
            //login timestamp
            console.log('checkin active - user timestamp renewal');
            //new TimeSchema
            var newTimer = new Timer();
            newTimer.MA_id=obj.username;
            newTimer.clockIn=Date.now();
            newTimer.clockOut=0;
            newTimer.save(function (err){

                if(err){
                    res.send(err);
                }
            });
            //set loginstate
            console.log("set loginstate -> true");

            Worker.findOneAndUpdate({username:obj.username}, {loginstate:true} , {upsert: true}, function (err, callback) {
                if (err || !callback) {
                   throw(err);
                } else {
                    console.log("updateCallback " + callback);
                    //res.sendFile('../content/mgmtCockpit.html', {root: __dirname});
                    //document.getElementById("stamp").innerHTML="mopps";
                }
            });
        }
    });
});

// Route zum generieren der Statistic-Daten
router.route('/genstats')
.get(function(req,res){

	Worker.find(function(err, workers){

		if(err)
			res.send(err);
		//res.json(workers);
		
		console.log("Generating FILE - 1....");
		//========================================
		// Generierung des ersten Json_Elements
		var dataFormat ='"data": [';
		console.log("DATA ? "+ workers.length );
		for (var k = 0; k < workers.length; k++) {
			dataFormat += '{ "label" : " ' + workers[k].name + '","value":"' +  getReadableHours(workers[k].credit) + '"}';
		
			if (k < workers.length-1){
				dataFormat += ',';
			}
	
		}
		dataFormat += ']';
		var stream = fs.createWriteStream(__dirname + "/../public/content/hoursJsonfile.json");
		stream.once('open', function(fd) {
		stream.write('{"chart": {"caption": "Aktuelle Arbeitszeiten","xaxisname": "Mitarbeiter","yaxisname": "Arbeitszeit in Stunden","numberprefix": "", "showvalues": "1","animation": "1"},');
		stream.write(dataFormat);
		stream.write(',"trendlines": [{"line": [{"showontop": "1","thickness": "5"}]}]}');
		stream.end();
		});
		//========================================
		// erstes Element fertig
		
		//========================================
		// Generierung 2.Element
		console.log("Generating FILE - 2....");
		var dataFormata ='"data": [';
		var Mann = 0;
		var Frau = 0
		for (var i = 0; i < workers.length; i++) {
			
			if (workers[i].gender === "male"){
				Mann = Mann + 1;
			}
			else
			{
				Frau = Frau + 1;
			}
				
		}
		dataFormata += '{ "label" : " ' + "Maenner" + '","value":"' +  Mann + '"},';
		dataFormata += '{ "label" : " ' + "Frauen" + '","value":"' +  Frau + '"}';
		dataFormata += ']}';
		var streamy = fs.createWriteStream(__dirname + "/../public/content/illnessJsonfile.json");
		streamy.once('open', function(fd) {
		streamy.write('{"chart": {"caption": "Auflistung der Krankheitstage" , "subCaption" : "nach Geschlecht", "numberPrefix": "", "showBorder": "0", "use3DLighting": "0", "enableSmartLabels": "0", "startingAngle": "310", "showLabels": "0", "showPercentValues": "1", "showLegend": "1","defaultCenterLabel": "Krankheitsverteilung", "centerLabel": "Krankheitstage $label: $value", "centerLabelBold": "1", "showTooltip": "0", "decimals": "0", "useDataPlotColorForLabels": "1", "theme": "fint"},');
		streamy.write(dataFormata);
		streamy.end();
		//========================================
		// Generierung 2.Element fertig
		
		
		
	res.json(workers);
		});
	

	});
});
module.exports = router;

