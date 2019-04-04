var mongoose = require('../connect.js');
var Schema = mongoose.Schema;

var changeactSchema = Schema({
    stuID:String,   //用户ID
    changeAct:[],   //需要修改的活动
    change:Boolean    //True为增加，False为删除
    
},{versionKey: false});

module.exports = mongoose.model('changeact', changeactSchema);