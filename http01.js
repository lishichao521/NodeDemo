var http = require("http");
var fs = require("fs");

http.createServer(function(request,response){
    fs.readFile("./a.txt","utf-8",function(err,data){ //读取文件
        if(err) throw err;
        response.end(data)
    })
}).listen(3000)