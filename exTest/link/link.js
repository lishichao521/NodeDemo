var http = require('http');

var query_site_name = function () {
    console.log(111)
    let Data = {}
    var options = {
        host: '192.168.1.15',
        port: 8080,
        path: '/user/org/query_site_name',
        method: 'POST',
        headers: headers
    };
    var headers = {
        'Content-Type': 'application/json',
    };
    var req = http.request(options, function (res) {
        // console.log(`状态码: ${res.statusCode}`);
        // console.log(`响应头: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            // console.log(`响应主体: ${chunk}`);
        });
        res.on('end', () => {
            // console.log('响应中已无数据。');
        });
    });
    // req.on('error', (e) => {
    //     console.error(`请求遇到问题: ${e.message}`);
    // });
    // // JSON.stringify(D)
    // req.write("doMain:'' ");
    // req.end();
    
    return req
}
var cc = function (req, res) {
    return 123456
}
var bb = function (req, res) {
    return 789456
}
exports.cc = cc;
exports.bb = bb;
exports.query_site_name = query_site_name;