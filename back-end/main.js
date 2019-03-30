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
    var b = req.body.name;
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
        res.send(req.body.name);

    });
});
app.get('/user', function (req, res) {
    User.findOne({stuID: req.query.stuid}, function (err, a) {
        if (err) return res.send(500, 'Error occurred: database error.');
        res.json({
            name: a.name,
            id: a.stuID,
            sex: a.sex,
            campus: a.campus,
        });
    });
});
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));