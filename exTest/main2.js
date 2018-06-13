var express = require("express");
var path = require("path");
var app = express();
app.get("/",function(req,res){
    res.end("hello world222")
})
var static = express.static( path.join(__dirname,"static")  );  //设置静态资源路径
app.use(static); //use这个路径设置 才可以 真正使用  
app.listen(3000);