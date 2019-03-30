var mongoose = require('../connect.js');
var Schema = mongoose.Schema;

var activitySchema = Schema({
    name:{type:String},
    des:{type:String},
    actID:{type:String},
    date:{type:String},
    time:{type:String},
    capacity:{type:String},
    tags:{type:String},
    createTime: {
        type: Date,
        default: Date.now
    }
    
},{versionKey: false});

module.exports = mongoose.model('activity',activitySchema);