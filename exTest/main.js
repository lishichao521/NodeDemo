var express = require("express");
var path = require("path")
var fs = require("fs");
var app = express();
var bodyParser = require('body-parser');
var link = require("./link/link.js")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var D = ''
fs.readFile("./static/data.json", "utf-8", function (err, data) {
    D = JSON.parse(data)
})
// 设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 接口
app.get('*', function (req, res) {
    // console.log(link.cc())
    // console.log(req.headers)
    // console.log(req.query)
    var getRequest = link.getRequest(req.query, function (statusCode, Data) {
        res.status(statusCode);
        res.json(JSON.parse(Data))
    })
});
app.post('*', function (req, res) {
    // console.log(link.cc())
    var PostRequest = link.PostRequest(req.body, function (statusCode, Data) {
        res.status(statusCode);
        res.json(JSON.parse(Data))
    })
});
// 服务端口
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().post;
    // console.log('Example app listening at http://%s:%s', host, port)
})