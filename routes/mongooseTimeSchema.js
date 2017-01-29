var mongoose = require('mongoose');
var mongodb =  require('mongodb');
var Schema  = mongoose.Schema;
var Promise = require('bluebird');
var bcrypt  = require('bcryptjs');

//temporary data for time calculaiton purposes
var timeSchema = new mongoose.Schema({
    MA_id: String
    , clockIn: Number
    , clockOut: Number
});

var Timer = module.exports = mongoose.model('Timer', timeSchema);

