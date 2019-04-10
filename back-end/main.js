//添加依赖
var mongoose = require('mongoose');
var express = require('express');
var app = express();
//增加静态文件访问的中间件
app.use(express.static('resources'));


var path = require('path');
var bodyParser = require('body-parser');//用于req.body获取值的
var formidable = require('formidable');
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));

var User = require('./modules/user.js');
//app.get('/api/user', function (req, res) {
//  User.find({ approved: true }, function (err, attractions) {
//    if (err) return res.send(500, 'Error occurred: database error.');
//    res.json(User.map(function (a) {
// return {
//  name: a.name,
//    stuID: a.stuID,
//      sex: a.sex,
//        campus: a.campus,
//      }
//    }));
//  });
//});

//使用POST方法来对数据库做增加操作
app.post('/user', function (req, res) {
    // var b = req.body.name;
    //console.log(b);
    //console.log(req);
    var a = new User({
        name: req.body.name,
        stuID: req.body.stuID,
        sex: req.body.sex,
        collectAct: req.body.collectAct,
        joinAct: req.body.joinAct,
        releasedAct: req.body.releasedAct
    });
    //查重操作，如果stuID有重复的就不会增加用户
    User.findOne({ stuID: a.stuID }, function (err, doc) {
        if (doc == null) {
            a.save(function (err, a) {
                if (err) return res.send(500, 'Error occurred: database error.');
                res.send("success!");
            });
        }
        else {
            //console.log("用户重复，未能成功添加记录... ...");
            res.send("用户重复，未能成功添加记录... ...");
        }
    });

});

//使用GET方法来对数据库做查询操作
app.get('/user', function (req, res) {
    User.findOne({ stuID: req.query.stuID }, function (err, a) {
        if (err) return res.send(500, 'Error occurred: database error.');
        res.json({
            name: a.name,
            stuID: a.stuID,
            sex: a.sex,
            collectAct: req.body.collectAct,
            joinAct: a.joinAct,
            releasedAct: a.releasedAct
        });
    });
});
app


//查询用户是否已注册
app.get('/user/isRegister', function (req, res) {
   //var request = require('request'); 
   const https = require('https');
   var code = req.body.code;
   const appID = 'wx8fa5ad1768c706c5';
   const appSecret = '875e3df6575b640b21e85f5a280feadd';
   var request = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appID + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code';
   https.get(request, (res) => {
       console.log(res.body);
    
});
});
//使用PUT方法来对数据库做修改操作
app.put('/user', function (req, res) {
    var a = new User({
        name: req.body.name,
        stuID: req.body.stuID,
        sex: req.body.sex,
        collectAct: req.body.colAct,
        joinAct: req.body.joinAct,
        releasedAct: req.body.releasedAct
    });
    //console.log(a);
    if (a.name !== undefined) {
        User.update({ stuID: a.stuID }, { name: a.name }).exec();
    }
    if (a.sex !== undefined) {
        User.update({ stuID: a.stuID }, { sex: a.sex }).exec();
    }
    if (a.campus !== undefined) {
        User.update({ stuID: a.stuID }, { campus: a.campus }).exec();
    }
    if (a.collectAct !== undefined) {
        var add = true;
        Act.findOne({ stuID: a.stuID }, function(err, user){
            try{
                a.collectAct.forEach(function(item, index, arr){
                var item1 = item;
                    user.collectAct.forEach(function(item, index, arr){
                        if(item !== item1){
                            add = false;
                            throw new Error("delete");
                        }
                })
            })
            }catch(e){

            }
            if(add) {
                a.collectAct.forEach(function(item, index, arr){
                    user.collectAct.push(item);
                })
            }
            else {
                a.collectAct.forEach(function(item, index, arr){
                    var index1 = user.collectAct.indexOf(item);
                    user.collectAct.splice(index1, 1);
                })
            }
            user.save();
        });
    }
    if (a.joinAct !== undefined) {
        var add = true;
        Act.findOne({ stuID: a.stuID }, function(err, user){
            try{
                a.joinAct.forEach(function(item, index, arr){
                var item1 = item;
                user.joinAct.forEach(function(item, index, arr){
                    if(item !== item1){
                        add = false;
                        throw new Error("delete");
                    }
                })
            })
            }catch(e){

            }
            if(add) {
                a.joinAct.forEach(function(item, index, arr){
                    user.joinAct.push(item);
                })
            }
            else {
                a.joinAct.forEach(function(item, index, arr){
                    var index1 = user.joinAct.indexOf(item);
                    user.joinAct.splice(index1, 1);
                })
            }
            user.save();
        });
    }
    if (a.releasedAct !== undefined) {
        var add = true;
        Act.findOne({ stuID: a.stuID }, function(err, user){
            try{
                a.releasedAct.forEach(function(item, index, arr){
                var item1 = item;
                user.releasedAct.forEach(function(item, index, arr){
                    if(item !== item1){
                        add = false;
                        throw new Error("delete");
                    }
                })
            })
            }catch(e){

            }
            if(add) {
                a.releasedAct.forEach(function(item, index, arr){
                    user.releasedAct.push(item);
                })
            }
            else {
                a.releasedAct.forEach(function(item, index, arr){
                    var index1 = user.releasedAct.indexOf(item);
                    user.releasedAct.splice(index1, 1);
                })
            }
            user.save();
        });
    }
    res.send("success!");
});

//使用DELETE方法对数据库做删除操作
app.delete('/user', function (req, res) {

    User.findOne({ stuID: req.body.stuID }, function (err, doc) {
        if (doc != null) {
            User.remove({ stuID: req.body.stuID }).exec();
            res.send("200 OK");
        }
        else res.send("记录不存在,删除失败... ...");
    });
});


var Act = require('./modules/activity.js');
//使用POST方法来对活动数据库做增加操作
app.post('/act', function (req, res) {
    console.log(req.body);
    var a = new Act({
        name: req.body.name,
        place: req.body.place,
        des: req.body.des,
        date: req.body.date,
        time: req.body.time,
        capacity: req.body.capacity,
        tag1: req.body.tag1,
        tag2: req.body.tag2,
        tag3: req.body.tag3,
        ownerID: req.body.ownerID,
        picUrl : req.body.picUrl
    });
    a.actID = a._id.toString();
    a.save(function(err, doc){
        User.findOne({stuID: a.ownerID}, function(err, doc){
            doc.releasedAct.push(a.actID);
            doc.save();
        });
        if (err) return res.send(500, 'Error occurred: database error.');
        res.send("success!");
    });
});

//使用GET方法来对活动数据库做查询操作
app.get('/act', function (req, res) {
    Act.findOne({ actID: req.query.actID }, function (err, a) {
        if (err) return res.send(500, 'Error occurred: database error.');
        res.json({
            name: a.name,
            place: a.place,
            des: a.des,
            actID: a.actID,
            date: a.date,
            time: a.time,
            capacity: a.capacity,
            tag1: a.tag1,
            tag2: a.tag2,
            tag3: a.tag3,
            picUrl: a.picUrl
        });
    })
});

//使用PUT方法来对活动数据库做修改操作
app.put('/act', function (req, res) {
    var a = new Act({
        name: req.body.name,
        place: req.body.place,
        des: req.body.des,
        actID: req.body.actID,
        date: req.body.date,
        time: req.body.time,
        capacity: req.body.capacity,
        tag1: req.body.tag1,
        tag2: req.body.tag2,
        tag3: req.body.tag3,
        picUrl: item.picUrl
    });-
    Act.findOne({ actID: a.actID}, function(err, doc){
        doc.name = a.name;
        doc.place = a.place;
        doc.des = a.des;
        doc.date = a.date;
        doc.time = a.time;
        doc.capacity = a.capacity;
        doc.tag1 = a.tag1;
        doc.tag2 = a.tag2;
        doc.tag3 = a.tag3;
        doc.picUrl = a.picUrl;
        doc.save();
    })
    res.send("success!")
});

//使用DELETE方法对活动数据库做删除操作
app.delete('/user', function (req, res) {

    Act.findOne({ actID: req.body.actID }, function (err, doc) {
        if (doc != null) {
            User.remove({ actID: req.body.actID }).exec();
            res.send("success!");
        }
        else res.send("记录不存在,删除失败... ...");
    });
});

//使用GET方法来查询活动数据库中所有活动
app.get('/act/all', function (req, res) {
    var all = new Array(0);
    Act.find(function (err, docs) {
        docs.forEach(function (item, index, arr) {
            var act = {
                name: item.name,
                actID: item.actID,
                date: item.date,
                time: item.time,
                tag1: item.tag1,
                tag2: item.tag2,
                tag3: item.tag3,
                picUrl: item.picUrl
            };
            all.push(act);
        });
        res.json({
            allAct: all
        });
    });
});

//使用GET方法来查询用户已收藏活动
app.get('/act/collect', function(req, res) {
    User.findOne({stuID: req.query.stuID}, function(err, user){
        var collectAct = new Array(0);
        user.collectAct.forEach(function(item, index, arr){
            Act.findOne({actID: item}, function(err, act){
                var act = {
                    name: item.name,
                    actID: item.actID,
                    date: item.date,
                    time: item.time
                }
                collectAct.push(act);
            })
            res.json({
                collectAct: collectAct
            });
        })
    })
})

//使用GET方法来查询用户已参与活动
app.get('/act/join', function(req, res) {
    User.findOne({stuID: req.query.stuID}, function(err, user){
        var joinAct = new Array(0);
        user.joinAct.forEach(function(item, index, arr){
            Act.findOne({actID: item}, function(err, act){
                var act = {
                    name: item.name,
                    actID: item.actID,
                    date: item.date,
                    time: item.time
                }
                joinAct.push(act);
            })
            res.json({
                joinAct: joinAct
            });
        })
    })
})

//使用GET方法来查询用户已发布活动
app.get('/act/released', function(req, res) {
    User.findOne({stuID: req.query.stuID}, function(err, user){
        var releasedAct = new Array(0);
        user.releasedAct.forEach(function(item, index, arr){
            Act.findOne({actID: item}, function(err, act){
                var act = {
                    name: item.name,
                    actID: item.actID,
                    date: item.date,
                    time: item.time
                }
                releasedAct.push(act);
            })
            res.json({
                releasedAct: releasedAct
            });
        })
    })
})

//使用GET方法来查询活动数据库中相应名称的活动
app.get('/act/query/name',function(req, res){
    var query = new Array(0);
    var name = req.query.name;
    var length = name.length;
    var i = 0;
    var regexp1 = name;
    var regexp2 = '[' + name + ']+'
    Act.find({$or: [{name: {$regex: new RegExp(regexp1)}}, {name: {$regex: new RegExp(regexp2)}}]}, function(err, docs){
        docs.forEach(function(item, index, arr){
            var act = {
                name: item.name,
                actID: item.actID,
                date: item.date,
                time: item.time,
                tag1: item.tag1,
                tag2: item.tag2,
                tag3: item.tag3
            };
            query.push(act);
        });
        res.json({
            queryAct : query
        });
    }); 
});

//使用GET方法来查询活动数据库中相应类别的活动
app.get('/act/query/tag',function(req, res){
    var query = new Array(0);
    Act.find($or[ {tag1: {$regex: req.query.tag}},
                  {tag2: {$regex: req.query.tag}},
                  {tag3: {$regex: req.query.tag}}
                ], function(err, docs){
                        docs.forEach(function(item, index, arr){
                            var act = {
                                name: item.name,
                                actID: item.actID,
                                date: item.date,
                                time: item.time,
                                tag1: item.tag1,
                                tag2: item.tag2,
                                tag3: item.tag3
                            };
                            query.push(act);
                        });
                        res.json({
                            queryAct : query
                        });
                    }); 
});

//测试图片上传功能

var fs = require('fs');


app.post('/pic', function (req, res) {
    var form = new formidable.IncomingForm();
    var targetFile = path.join(__dirname, './resources/pic/act_pic');

    form.encoding = 'utf-8';
    form.uploadDir = targetFile;
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
        if (err) return res.redirect(303, '/error');
        //随图片上传的数据放在fileds中
        //console.log(fields.pic_id);
        //console.log(files.Pic.path);
        //图片重命名逻辑
        //相同名字的图片将会被新的覆盖
        var oldpath = files.Pic.path;
        var newpath = path.join(path.dirname(oldpath), files.Pic.name);
        fs.rename(oldpath, newpath);
        var tempath = newpath.split("resources");
        var finalpath = tempath[1];
        //console.log(finalpath);
        res.send(finalpath);
    });
});



app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));