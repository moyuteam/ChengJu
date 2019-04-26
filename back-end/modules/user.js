var mongoose = require('../connect.js');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name:String,     //用户姓名
    stuID:String,    //用户ID
    openID:String,
    sex:String,      //用户性别
    verifyUser:Boolean,   //用户真实性验证标识
    createTime: {       //用户创建时间
        type: Date,
        default: Date.now
    },
    collectAct: Array,    //用户收藏活动列表
    joinAct: Array,    //用户参与活动列表
    releasedAct: Array  //用户发布活动列表
},{versionKey: false});

module.exports = mongoose.model('user',userSchema);