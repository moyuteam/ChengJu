var mongoose = require('../connect.js');
var Schema = mongoose.Schema;

var activitySchema = Schema({
    name:String,
    des:String,
    actID:String,
    date:String,
    time:String,
    capacity:String,
    tags:String,
    createTime: {
        type: Date,
        default: Date.now
    },
    ownerID:String
    
},{versionKey: false});

module.exports = mongoose.model('activity',activitySchema);