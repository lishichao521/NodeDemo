var http = require('http');
var options = {
    // host: '192.168.1.15',
    host: '192.168.1.16',
    port: 8080,
    path: '/user/org/query_site_name',
    method: 'POST',
    headers: headers
};
var headers = {
    'Content-Type': 'application/json',
};
var PostRequest = function (D, callback) {
    var req = http.request(options, function (res) {
        // console.log(`状态码: ${res.statusCode}`);
        // console.log(`响应头: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            callback(res.statusCode, chunk)
            // console.log(`响应主体: ${chunk}`);
        });
        res.on('end', () => {
        });
    });
    req.on('error', (e) => {
        callback(500, { code: 200, mag: '未知异常' })
        // console.error(`请求遇到问题: ${e.message}`);
    });

    var params = JSON.stringify(D)
    params.substr(1, params.length - 2)
    req.write(params);
    req.end();
}
var cc = function (req, res) {
    return 123456
}
var bb = function (req, res) {
    return 789456
}
exports.cc = cc;
exports.bb = bb;
exports.getRequest = getRequest;
exports.PostRequest = PostRequest;