var mongoose = require('../connect.js');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name:{type:String},
    stuID:{type:String},
    sex:{type:String},
    campus:{type:String},
    createTime: {
        type: Date,
        default: Date.now
    }
    
},{versionKey: false});

module.exports = mongoose.model('user',userSchema);