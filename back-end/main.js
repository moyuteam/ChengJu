var mongoose = require('mongoose');
var express = require('express');


var app = express();

var path = require('path');
var bodyParser = require('body-parser');//用于req.body获取值的
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
app.post('/user', function (req, res) {
    // var b = req.body.name;
    //console.log(b);
    //console.log(req);
    var a = new User({
        name: req.body.name,
        stuID: req.body.stuID,
        sex: req.body.sex,
        campus: req.body.campus,

    });
    a.save(function (err, a) {
        if (err) return res.send(500, 'Error occurred: database error.');
        res.send("success!");

    });
});
app.get('/user', function (req, res) {
    User.findOne({ stuID: req.query.stuid }, function (err, a) {
        if (err) return res.send(500, 'Error occurred: database error.');
        res.json({
            name: a.name,
            id: a.stuID,
            sex: a.sex,
            campus: a.campus,
        });
    });
});


var Act = require('./modules/activity.js');
app.post('/act', function (req, res) {
    var a = new Act({
        name: req.body.name,
        des: req.body.des,
        actID: req.body.actID,
        date: req.body.date,
        time: req.body.time,
        capacity: req.body.capacity,
        tags: req.body.tags,
    });
    a.save(function (err, a) {
        if (err) return res.send(500, 'Error occurred: database error.');
        res.send("success!");
    });
});
app.get('/act', function (req, res) {
    Act.findOne({ actID: req.query.actid }, function (err, a) {
        if (err) return res.send(500, 'Error occurred: database error.');
        res.json({
            name: a.name,
            des: a.des,
            actID: a.actID,
            date: a.date,
            time: a.time,
            capacity: a.capacity,
            tags: a.tags,
        });
    });
});





app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));