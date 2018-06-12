var fs = require("fs");
fs.readFile("./a.txt", "utf-8", function (err, data) { //读取文件
    if (err) throw err;
    console.log(data);
    // fs.writeFile("./b.txt",data,function(err){ //写入文件
    //     if(err) throw err;
    // })
    // fs.appendFile("./b.txt", data, function (err) { //写入文件
    //     if (err) throw err;
    // })
    // fs.unlink("./b.txt", function (err) { //删除文件
    //     if (err) throw err;
    // })
    // fs.mkdir("c",function(err){ //创建 c 文件夹
    //     if(err) throw err;
    // })
    // fs.rename("c","d",function(err){ //修改文件夹名
    //     if(err) throw err
    // })
    // fs.rename("./a.txt","./b.txt",function(err){ //修改文件名
    //     if(err) throw err
    // })
})