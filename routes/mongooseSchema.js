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
	, startDate: Number
	, endDate: Number
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
    callback(null, Worker.findOne ({'username':usernameVal},function(err,worker){
        if(err) throw err;
        return worker;
    }));
    console.log("callback :"+ callback);
};

module.exports.getWorkerById = function(id, callback){
    Worker.findById(id, callback);
};

module.exports.checkPassword = function(pass, hash, callback){
    console.log('checkPaswort - mongooseSchema');
    bcrypt.compare(pass, hash, function(err, res) {
        console.log('pass '+ pass +'  hash: '+hash);
        if(err) {
            console.log("error checking password "+err);
        };
        callback(null, res);
    });
};

/*module.exports.checkRole = function(username, callback){
    Worker.findOne({username:username},'role',function(err,worker){
        if(err) return handleError(err);
        callback(null,worker.role);
    })
}; -- outdated */




//temporary data for time calculaiton purposes
var timeSchema = new mongoose.Schema({
    MA_id: String
    , sessionToken: String //possibly redundant <> id
    , clockIn: Number
    , clockOut: Number
});

var Timer = module.exports = mongoose.model('Timer', timeSchema);
