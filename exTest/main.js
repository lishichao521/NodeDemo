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
    // app.get("/", function (req1, res1) {
    //     res1.end('sssss')
    // })
});
// 接口
app.post('*', function (req, res) {
    // console.log(link.cc())
    let DATA = link.query_site_name()
    DATA.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
    });
    // JSON.stringify(D)
    DATA.write("doMain:'' ");
    DATA.end();
    // res.status(DATA.statusCode);
        res.status(200);
        res.json({ code: 333, msg: '账号或密码错误' })
    console.log(DATA.body)
    // let r = req.body
    // let isY = false
    // for (let i = 0; i < D.length; i++) {
    //     if (r.name === D[i].name && r.pw === D[i].pw) {
    //         isY = true;
    //         break;
    //     } else {
    //         isY = false;
    //     }
    // }
    // if (isY) {
    //     res.status(200);
    //     res.json({ code: 0, msg: '登录成功' })
    // } else {
    //     res.status(200);
    //     res.json({ code: 333, msg: '账号或密码错误' })
    // }
});
// 服务端口
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().post;
    // console.log('Example app listening at http://%s:%s', host, port)
})