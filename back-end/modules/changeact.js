var mongoose = require('../connect.js');
var Schema = mongoose.Schema;

var changeactSchema = Schema({
    stuID:String,
    changeAct:[],
    change:Boolean    //True为增加，False为删除
    
},{versionKey: false});

//change用于调用相关修改操作（添加或删除）
changeactSchema.methods.cge = function(usr){
    if(this.change === True){
        this.add(usr);
    }
    else{
        this.remove(usr);
    }
}

//add用于添加用户活动
changeactSchema.methods.add = function(usr){
    this.changeAct.forEach(function(item, index, arr){
        var idx = usr.joinAct.indexOf(item);
        if(idx === -1)
            usr.joinAct.push(item);
    })
    return true;
}

//remove用于删除用户活动
changeactSchema.methods.remove = function(usr){
    if(this.changeAct.length > usr.joinAct.length){
        return false;
    }   
    this.changeAct.forEach(function(item, index, arr){
        var idx = usr.joinAct.indexOf(item);
        if(idx === -1)
            return false;
        usr.joinAct.splice(idx, 1);
    })
    return true;
}

module.exports = mongoose.model('changeact', changeactSchema);