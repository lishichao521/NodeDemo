var fs = require("fs");
var data = "";
var rs = fs.createReadStream("a.txt") //创建读取流
var ws = fs.createWriteStream("b.txt") //创建读取流 - 写入
rs.setEncoding("utf-8"); //设置文件编码
//监听当有数据流入的时候
rs.on("data",function(chunc){
    // console.log("...")
    console.log(data)
    ws.write(chunc,"utf-8")
})
rs.on("end",function(){
    console.log("没有数据了")
    ws.end();
})