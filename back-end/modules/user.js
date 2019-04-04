var mongoose = require('../connect.js');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name:String,     //用户姓名
    stuID:String,    //用户ID
    sex:String,      //用户性别
    verifyUser:Boolean,   //用户真实性验证标识
    createTime: {       //用户创建时间
        type: Date,
        default: Date.now
    },
    colAct:Array,    //用户收藏活动列表
    joinAct:Array    //用户参与活动列表
    
},{versionKey: false});

module.exports = mongoose.model('user',userSchema);