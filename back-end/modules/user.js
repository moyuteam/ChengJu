var mongoose = require('../connect.js');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name:String,
    stuID:String,
    sex:String,
    campus:String,
    verifyUser:Boolean,
    createTime: {
        type: Date,
        default: Date.now
    }
    
},{versionKey: false});

module.exports = mongoose.model('user',userSchema);