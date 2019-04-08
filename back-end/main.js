var mongoose = require('mongoose');
var express = require('express');


var app = express();


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
        colAct: req.body.colAct,
        joinAct: req.body.joinAct
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
            console.log("用户重复，未能成功添加记录... ...");
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
            id: a.stuID,
            sex: a.sex,
            colAct: req.body.colAct,
            joinAct: a.joinAct
        });
    });
});

//使用PUT方法来对数据库做修改操作
app.put('/user', function (req, res) {
    var a = new User({
        name: req.body.name,
        stuID: req.body.stuID,
        sex: req.body.sex,
        colAct: req.body.colAct,
        joinAct: req.body.joinAct
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

    res.send("success!");
});

//使用DELETE方法对数据库做删除操作
app.delete('/user', function (req, res) {

    User.findOne({ stuID: req.body.stuID }, function (err, doc) {
        if (doc != null) {
            User.remove({ stuID: req.body.stuID }).exec();
            res.send("success!");
        }
        else res.send("记录不存在,删除失败... ...");
    });
});


var Act = require('./modules/activity.js');
//使用POST方法来对活动数据库做增加操作
app.post('/act', function (req, res) {
    var a = new Act({
        name: req.body.name,
        place: req.body.place,
        des: req.body.des,
        date: req.body.date,
        time: req.body.time,
        capacity: req.body.capacity,
        tags: req.body.tags,
        ownerID: req.body.ownerID
    });
    a.save(function (err, a) {
        User.findOne({stuID: a.ownerID}, function(err, doc){
            console.log(a)
            doc.releasedAct.push(a._id.str);
            doc.save();
        })
        User.findOne({stuID: a.ownerID}, function(err, doc){
            console.log(doc)
        })
        if (err) return res.send(500, 'Error occurred: database error.');
        res.send("success!");
        console.log(a);
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
            tags: a.tags,
        });
    });
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
        tags: req.body.tags,
    });
    console.log(a);
    if (a.actID == undefined) {
        res.send("Error 101 : not found 'actID'!");
    }
    if (a.name !== undefined) {
        Act.update({ actID: a.actID }, { name: a.name }).exec();
    }
    if (a.des !== undefined) {
        Act.update({ actID: a.actID }, { des: a.des }).exec();
    }
    if (a.date !== undefined) {
        Act.update({ actID: a.actID }, { date: a.date }).exec();
    }
    if (a.time !== undefined) {
        Act.update({ actID: a.actID }, { time: a.time }).exec();
    }
    if (a.capacity !== undefined) {
        Act.update({ actID: a.actID }, { capacity: a.capacity }).exec();
    }
    if (a.tags !== undefined) {
        Act.update({ actID: a.actID }, { tags: a.tags }).exec();
    }
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
app.get('/act/all',function(req, res){
    var all = new Array(0);
    Act.find(function(err, docs){
        docs.forEach(function(item, index, arr){
            var act = {
                name: item.name,
                actID: item.actID,
                date: item.date,
                time: item.time,
                tags: item.tags,
            };
            all.push(act);
            //该处为新加项"图片"
        });
        res.json({
            allAct : all
        });
    }); 
});

var ChangeAct = require('./modules/changeact');
//使用PUT方法来对用户活动做修改操作
app.put('/user/change', function (req, res) {
    var a = new ChangeAct({
        stuID: req.body.stuID,
        changeAct: req.body.changeAct,
        change: req.body.change
    })
    User.findOne({ stuID: req.body.stuID }, function (err, doc) {
        if(doc != null) {
            var cge = a.change;
            var acts = doc.joinAct;
            if(cge === true){
                a.changeAct.forEach(function(item, index, arr) {
                    var idx = acts.indexOf(item);
                    if(idx === -1){
                        acts.push(item);
                    }
                })
                if(acts[0] === ''){
                    acts.splice(0, 1);
                }
            }
            else{
                a.changeAct.forEach(function(item, index, arr) {
                    var idx = acts.indexOf(item);
                    if(idx !== -1){
                        acts.splice(idx, 1);
                    }
                    else{
                        res.send("活动不存在！");
                    }
                })
            }
            console.log(doc);
            User.update({stuID : a.stuID},{joinAct : acts}).exec();
            res.send("success!");
        }
    })

});

//测试图片上传功能

var fs = require('fs');


app.post('/pic',function(req,res){
    var form = new formidable.IncomingForm();
    var targetFile = path.join(__dirname,'./upload_file');
    
    form.encoding = 'utf-8';
    form.uploadDir = targetFile; 
    form.keepExtensions = true;  
    


    form.parse(req, function(err, fields, files){
        if(err) return res.redirect(303, '/error');
        //随图片上传的数据放在fileds中
        console.log(fields.pic_id);
        console.log(files.Pic.path);
        //图片重命名逻辑
        //相同名字的图片将会被新的覆盖
        var oldpath = files.Pic.path;
        var newpath = path.join(path.dirname(oldpath),files.Pic.name);
        fs.rename(oldpath,newpath);
        res.send('done.');
    });
});



app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));