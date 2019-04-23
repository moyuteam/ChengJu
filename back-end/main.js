//部署HTTPS证书
// const https = require('https');
// const fs_1 = require('fs');
// const options = {
//     pfx: fs_1.readFileSync('../../SSL/diaosudev.cn.pfx'),
//     passphrase: '873340a0lc6w5'
//   };
//添加依赖
var mongoose = require('mongoose');
var express = require('express');
var app = express();
//增加静态文件访问的中间件
app.use(express.static('resources'));

// var httpsServer = https.createServer(options,app);
var path = require('path');
var bodyParser = require('body-parser');//用于req.body获取值的
var formidable = require('formidable');
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));

var User = require('./modules/user.js');

//使用POST方法来对数据库做增加操作
app.post('/user', function (req, res) {
    // var b = req.body.name;
    //console.log(b);
    //console.log(req);‘
    console.log(req);
    var a = new User({
        name: req.body.name,
        stuID: req.body.stuID,
        openID: req.body.openID,
        sex: req.body.sex,
        collectAct: req.body.collectAct,
        joinAct: req.body.joinAct,
        releasedAct: req.body.releasedAct
    });
    console.log(a);
    //查重操作，如果stuID有重复的就不会增加用户
    User.findOne({ stuID: req.body.stuID }, function (err, doc) {
        if (doc == null) {
            var a = new User({
                name: req.body.name,
                stuID: req.body.stuID,
                openID: req.body.openID,
                sex: req.body.sex,
                campus: req.body.campus,
                collectAct: req.body.collectAct,
                joinAct: req.body.joinAct,
                releasedAct: req.body.releasedAct
            });
            a.save(function (err, a) {
                if (err) return res.send(500, 'Error occurred: database error.');
                res.send("success!");
            });
        }
        else {
            res.send("repeat!");
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
            campus: a.canpus,
            collectAct: req.body.collectAct,
            joinAct: a.joinAct,
            releasedAct: a.releasedAct
        });
    });
});
app.get('/user/exchange',function(req,res){
 
    var openid = req.query.openID;
 
    var stuid;
    User.findOne({ openID:openid },function(err,a){
        
        res.send({ stuID:a.stuID,name:a.name });
  
    })
    
});


//查询用户是否已注册
//与微信服务器通讯
//返回openID（用户唯一标识）和isRegister（用户是否注册)
app.get('/user/isRegister', function (req, res_1) {
    var async = require('async');
    var request = require('request');
    var code = req.query.code;
    var openid;
    var isRegister = false;
    const appID = 'wx8fa5ad1768c706c5';
    const appSecret = '875e3df6575b640b21e85f5a280feadd';
    var request_path = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appID + '&secret=' + appSecret + '&js_code=' + code + '&grant_type=authorization_code';
    request(request_path, function (err, res, body) {
        openid = res.body.split('openid":"');
        openid = openid[1].split('"');
        openid = openid[0];
        User.findOne({ openID: openid }, function (err, a) {
            if (err) return res.send(500, 'Error occurred: database error.');
            //判断用户数据是否存在数据库中
            if (a != undefined) {
                isRegister = true;
            } else {
                isRegister = false;
            }
<<<<<<< HEAD
            console.log(openid);
            console.log(isRegister);
            if(isRegister){
                res_1.send({ openID: openid, isRegister: isRegister, stuID:a.stuID,name:a.name });
            }
            else{
                res_1.send({ openID: openid, isRegister: isRegister});
            }
            

=======
            
            //根据用户是否已注册返回不同的数据
            if(isRegister == true){
                res_1.send({ openID: openid, isRegister: isRegister, stuID:a.stuID,name:a.name });
            }else{
                res_1.send({ openID: openid, isRegister: isRegister });
            }
            
>>>>>>> 4a19487be4262188d2436e9c29f0d562f8a6617a
        });
    });



});

//使用PUT方法来对数据库做修改操作
app.put('/user', function (req, res) {
    var a = new User({
        name: req.body.name,
        stuID: req.body.stuID,
        openID: req.body.openID,
        sex: req.body.sex,
        campus: req.body.campus,
        collectAct: req.body.colAct,
        joinAct: req.body.joinAct,
        releasedAct: req.body.releasedAct
    });
    User.findOne({ stuID: req.body.stuID }, function (err, user) {     //不空则更新，空则不更新
        user.name = a.name ? a.name : user.name;
        user.sex = a.sex ? a.sex : user.sex;
        user.campus = a.campus ? a.campus : user.campus;
        if (a.collectAct !== undefined) {
            var add = true;
            try {
                a.collectAct.forEach(function (item, index, arr) {  //判断更新还是删除
                    if (user.collectAct.indexOf(item) !== -1) {      //若存在相同活动，则为删除
                        add = false;
                        throw new Error("delete");
                    }
                })
            } catch (e) {

            }
            if (add) {
                a.collectAct.forEach(function (item, index, arr) {
                    user.collectAct.push(item);
                })
            }
            else {
                a.collectAct.forEach(function (item, index, arr) {
                    var index1 = user.collectAct.indexOf(item);
                    user.collectAct.splice(index1, 1);
                })
            }
        }
        if (a.joinAct !== undefined) {
            var add = true;
            try {
                a.joinAct.forEach(function (item, index, arr) {  //判断更新还是删除
                    if (user.joinAct.indexOf(item) !== -1) {      //若存在相同活动，则为删除
                        add = false;
                        throw new Error("delete");
                    }
                })
            } catch (e) {

            }
            if (add) {
                a.joinAct.forEach(function (item, index, arr) {
                    user.joinAct.push(item);
                })
            }
            else {
                a.joinAct.forEach(function (item, index, arr) {
                    var index1 = user.joinAct.indexOf(item);
                    user.joinAct.splice(index1, 1);
                })
            }
        }
        if (a.releasedAct !== undefined) {
            var add = true;
            try {
                a.releasedAct.forEach(function (item, index, arr) {  //判断更新还是删除
                    if (user.releasedAct.indexOf(item) !== -1) {      //若存在相同活动，则为删除
                        add = false;
                        throw new Error("delete");
                    }
                })
            } catch (e) {

            }
            if (add) {
                a.releasedAct.forEach(function (item, index, arr) {
                    user.releasedAct.push(item);
                })
            }
            else {
                a.releasedAct.forEach(function (item, index, arr) {
                    var index1 = user.releasedAct.indexOf(item);
                    user.releasedAct.splice(index1, 1);
                })
            }
        }
        user.save();
        if(req.body.joinAct.length === 1){
            res.json({
                actID: req.body.joinAct
            });
        }
            //提示服务器报名成功
    });
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
        picUrl: req.body.picUrl
    });
    a.actID = a._id.toString();
    a.save(function (err, doc) {
        User.findOne({ stuID: a.ownerID }, function (err, doc) {  //ObjectID到actID映射
            doc.releasedAct.push(a.actID);
            doc.save();
        });
        if (err) return res.send(500, 'Error occurred: database error.');
        res.send("success!");
    });
});

//使用GET方法来对活动数据库做查询操作
app.get('/act', function (req, res) {
    var isjoin;
    if(req.query.stuID !== undefined){     //获取当前用户对指定活动的参与状态，isjoin的值true为已参与，false为未参与
        User.findOne({ stuID: req.query.stuID}, function(err, user){
            if(user.joinAct !== undefined){
                if(user.joinAct.indexOf(req.query.actID) !== -1){
                    isjoin = true;
                }
                else{
                    isjoin = false;
                }
            }
        })
    }
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
            picUrl: a.picUrl,
            isJoin: isjoin?isjoin:false
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
    });
        Act.findOne({ actID: a.actID }, function (err, doc) {
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
            doc.save(function (err, doc) {
                if (err) return res.send(500, "Error occurred: database error.")
                res.send("success!")
            });
        })
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
    User.findOne({ stuID: req.query.stuID}, function(err, user){
        var collectAct = new Array(0);
        if(user.collectAct == undefined){
            res.send("No Act Found!");
        }else{
            user.collectAct.forEach(function (item, index, arr) {
                var acts = {
                    actID: item.actID
                }
                collectAct.push(acts);
            })
            res.json({
                collectAct: collectAct
            });
        }
    })
});

//使用GET方法来查询用户已参与活动
app.get('/act/join', function(req, res) {
    User.findOne({ stuID: req.query.stuID}, function(err, user){
        var joinAct = new Array(0);
        if(user.joinAct == undefined){
            res.send("No Act Found!");
        }else{
            user.joinAct.forEach(function (item, index, arr) {
                var acts = {
                    actID: item.actID
                }
                joinAct.push(acts)
            })
            res.json({
                joinAct: joinAct
            });
        }
    })
});

//使用GET方法来查询用户已发布活动
app.get('/act/released', function(req, res) {
    User.findOne({ stuID: req.query.stuID}, function(err, user){
        var releasedAct = new Array(0);
        if(user.releasedAct == undefined){
            res.send("No Act Found!");
        }else{
            user.releasedAct.forEach(function (item, index, arr) {
                var acts = {
                    actID: item.actID
                }
                releasedAct.push(acts)
            })
            res.json({
                releasedAct: releasedAct
            });
        }
    })
});

//使用GET方法来查询活动数据库中相应名称的活动
app.get('/act/query/name', function (req, res) {
    var query = new Array(0);
    var name = req.query.name;
    var length = name.length;
    var i = 0;
    var regexp1 = name;        //匹配包含关键字活动
    var regexp2 = '[' + name + ']+'      //匹配包含部分关键字活动
    Act.find({ $or: [{ name: { $regex: new RegExp(regexp1) } }, { name: { $regex: new RegExp(regexp2) } }] }, function (err, docs) {
        docs.forEach(function (item, index, arr) {
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
            queryAct: query
        });
    });
});

//使用GET方法来查询活动数据库中相应类别的活动
app.get('/act/query/tag', function (req, res) {
    var query = new Array(0);
    Act.find($or[{ tag1: { $regex: req.query.tag } },
        { tag2: { $regex: req.query.tag } },
        { tag3: { $regex: req.query.tag } }
    ], function (err, docs) {
        docs.forEach(function (item, index, arr) {
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
            queryAct: query
        });
    });
});

//图片上传功能逻辑
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