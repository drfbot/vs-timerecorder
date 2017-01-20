var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


// registry and persistent data
var WorkerSchema = new mongoose.Schema({
    id: Number
    , passwd: String
    , role: String
    , sessionToken: String
    , contract: String
    , debit: String
    , credit: Boolean
    , vacation: String
    , illness: String
    , coreWorkingTime: String
});


//temporary data for calculaiton purposes

var TimeSchema = new mongoose.Schema({
   MA_id: String
    , sessionToken: String //possibly redundant <> id
    , clockIn: String
    , clockOut: String
});

module.exports = mongoose.model('MA', ArtistSchema);