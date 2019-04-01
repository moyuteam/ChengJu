var mongoose = require('../connect.js');
var Schema = mongoose.Schema;

var changeactSchema = Schema({
    stuID:String,
    changeAct:[],
    change:Boolean    //True为增加，False为删除
    
},{versionKey: false});

module.exports = mongoose.model('changeact', changeactSchema);