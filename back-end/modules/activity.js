var mongoose = require('../connect.js');
var Schema = mongoose.Schema;

var activitySchema = Schema({
    name:String,    //活动名
    place:String,   //活动地点
    des:String,     //活动描述
    actID:String,   //活动ID
    date:String,    //活动日期
    time:String,    //活动时间
    capacity:String, //活动人数
    tags:Array,    //活动标签
    createTime: {   //创建时间
        type: Date,
        default: Date.now
    },
    ownerID:String,  //创建者ID
    picUrl:String
    
},{versionKey: false});

module.exports = mongoose.model('activity',activitySchema);