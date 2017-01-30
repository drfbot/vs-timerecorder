var mongoose = require('mongoose');
var mongodb =  require('mongodb');
var Schema  = mongoose.Schema;
var Promise = require('bluebird');
var bcrypt  = require('bcryptjs');



// registry and persistent data
var workerSchema = new mongoose.Schema({
    username: String
    , name: String
    , passwd: String
    , timestamp: Number
    , loginstate: Boolean
    , gender: String
    , role: String
    , portrait: String
    , sessionToken: String
    , contract: String
	, startDate: String
	, endDate: String
    , debit: Number
    , credit: Number
    , vacation: Number
	, vacationState: Boolean
    , illness: Number
	, illnessState: Boolean
	, street: String
	, postalcode: Number
	, city: String
	, phone: String
} );//{collection:'Worker'}


var Worker = module.exports = mongoose.model('Worker', workerSchema);


module.exports.getWorkerByUsername = function(usernameVal, callback){
    console.log("get worker by username");
    Worker.findOne ({username:usernameVal},function(err,worker){
        if(err) throw err;
        else{
            console.log("callback :"+ callback);
            callback(null ,worker);
        }
    });
};

module.exports.getWorkerById = function(id, callback){
    Worker.findById(id, callback);
};

module.exports.checkPassword = function(pass, hash, callback){
    console.log('checkPaswort - mongooseSchema');
    console.log('pass1 '+ pass +'  hash1: '+hash);
    bcrypt.compare(pass, hash, function(err, res) {
        console.log('pass2'+ pass +'  hash2 '+hash);
        if(err) {
            console.log("error checking password "+err);
        }
        callback(res);
    });
};

module.exports.deleteUserByUsername = function(username, callback){
    console.log("DelUser - mongooseSchema "+username);
    Worker.remove({username: username},
        function(err) {
            if (err) callback.json(err);
            //else    res.redirect("../content/public/mgmntCokpit.html");
        });
    /*Worker.findByIdAndRemove({username:username},function(err,worker){
        if(err) return err;
        callback(null,true);
    });*/
};

