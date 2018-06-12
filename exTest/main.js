var express = require("express");
var app = express();
app.get("/",function(req,res){
    res.end("hello world")
})
app.get("/a",function(req,res){
    res.end('222222222');
})
app.get("/b",function(req,res){
    res.end('33333333')
})
app.listen(3000)