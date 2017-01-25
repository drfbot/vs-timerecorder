var mongoose     = require('mongoose');
var mongodb =  require('mongodb');
var Schema       = mongoose.Schema;
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');



// registry and persistent data
var workerSchema = new mongoose.Schema({
    username: String
    , name: String
    , passwd: String
    , role: String
    , sessionToken: String
    , contract: String
    , debit: Number
    , credit: Number
    , vacation: Number
    , illness: Number
});


var Worker = module.exports = mongoose.model('Worker', workerSchema);

/*module.exports.createWorker = function(newWorker, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newWorker.passwd, salt, function(err, hash) {
            newWorker.passwd = hash;
            newWorker.save(callback);
        });
    });
}*/

module.exports.getWorkerByUsername = function(username, callback){
    Worker.findOne({username : username}, callback);
};

module.exports.getWorkerById = function(id, callback){
    Worker.findById(id, callback);
};

module.exports.checkPassword = function(pass, hash, callback){
    bcrypt.compare(pass, hash, function(err, res) {
        if(err) throw err;
        callback(null, res);
    });
};
module.exports.checkRole = function(username, callback){
    Worker.findOne({username:username},'role',function(err,worker){
        if(err) return handleError(err);
        callback(null,worker.role);
    })
};



//temporary data for calculaiton purposes
/*
var timeSchema = new mongoose.Schema({
    MA_id: String
    , sessionToken: String //possibly redundant <> id
    , clockIn: String
    , clockOut: String
});


module.exports = mongoose.model('Time', timeSchema);*/