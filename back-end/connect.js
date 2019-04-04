var mongoose = require('mongoose'),
    DB_URL = 'mongodb://148.70.157.68:27017/Danny';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
    console.log('======================================================================');
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;