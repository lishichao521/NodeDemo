const Koa = require("koa");
const router = require("koa-router")();
const link = require("./req/req");
const cors = require("koa2-cors");
var path = require("path");
// var bodyParser = require("koa-bodyparser");
const koaBody = require("koa-body");
var fs = require("fs");
const app = new Koa();
app.use(cors());
app.use(
    koaBody({
        multipart: true, // 支持文件上传
        encoding: "utf-8",
        formidable: {
            uploadDir: path.join(__dirname, "static/"), // 设置文件上传目录
            keepExtensions: true, // 保持文件的后缀
            maxFileSize: 2 * 1024 * 1024, // 文件上传大小
            onFileBegin: (name, file) => {
                // 文件上传前的设置
                // file.path = "upload/" + file.name; //修改文件名字
                console.log(`name: ${name}`);
            },
            onError: err => {
                ctx.body = {
                    code: 233,
                    msg: "文件过大"
                };
                console.log(111, err);
            }
        }
    })
);
app.use(router.routes());
app.use(async ctx => {
    if (ctx.method === "POST") {
        if (ctx.url === "/uploadfile") {
            ctx.body = {
                code: 0,
                url: ctx.request.files.file.path,
                msg: "上传成功！"
            };
            // return (ctx.body = "上传成功！");
        } else if (ctx.url === "/uploadfiles") {
            // 上传多个文件
        } else {
            let POST_D = await link.PostRequest(ctx.request.body, ctx.url);
            ctx.body = POST_D;
        }
    } else if (ctx.method === "GET") {
        let GET_D = await link.GetRequest(ctx.query, ctx.url);
        ctx.body = GET_D;
    }
});

// 聊天消息
var server = require("http").Server(app.callback());
var io = require("socket.io")(server);
let infoData = [];
let userList = []; //客户端链接id
let videoData = [];
let anchor = []; //视频主播id

// var ws = fs.createWriteStream("./video2.mov"); //创建读取流
// rs.on("data", function(chunc) {
//     console.log(chunc);
//     ws.write(chunc)
// });
// rs.on("end", function() {
//     console.log("没有数据了");
//     ws.end()
// });

io.on("connection", socket => {
    // 发送链接者的id
    socket.emit("socketId", { data: socket.id });
    // 存储视频主播id
    socket.on("anchor", id => {
        anchor[0] = id;
        console.log(anchor[0], "anchor");
    });
    // 存储所有连接着id
    userList = Object.keys(socket.adapter.rooms);
    console.log("链接", userList);
    let isOne = true;
    for (k = 0; k < videoData.length; k++) {
        socket.to(socket.id).emit("sendVideo", { data: videoData[k] });
    }
    // 监听客户端发来的消息
    socket.on("videoStreaming", data => {
        // if (videoData.length === 0) {
        //     videoData.push(data);
        // }
        // videoData[1] = data;
        videoData.push(data);
        // console.log(111, videoData[1]);
        for (let i = 0; i < userList.length; i++) {
            if (userList[i] !== anchor[0]) {
                if (isOne) {
                    for (k = 0; k < videoData.length; k++) {
                        socket
                            .to(userList[i])
                            .emit("sendVideo", { data: videoData[k] });
                    }
                    console.log(anchor[0], 11111);
                    isOne = false;
                } else {
                    console.log(isOne, 2222);
                    socket.to(userList[i]).emit("sendVideo", { data: data });
                }
            }
        }
        // for (k = 0; k < videoData.length; k++) {
        //     socket.to(userList[i]).emit("sendVideo", { data: videoData[k] });
        // }
    });

    //客户端断开连接
    socket.on("disconnecting", function(socket) {
        console.log("断开", socket);
        // io.sockets.emit("updatePerson", {
        //   userNumber: io.sockets.server.eio.clientsCount
        // });
    });
});

server.listen(1337, "192.168.0.184");
// 聊天消息

// router.post('/org/query_site_name', async (ctx) => {
//     await postReq(ctx.request.body, ctx.url)
//     ctx.body = D
// })
// app.use(async (ctx) => {
//     // // 从上下文的request对象中获取
//     // let request = ctx.request
//     // let req_query = request.query
//     // let req_querystring = request.querystring
//     // // 从上下文中直接获取
//     // let ctx_query = ctx.query
//     // let ctx_querystring = ctx.querystring

//     let url = ctx.url
//     let ctx_query = ctx.query
//     let ctx_querystring = ctx.querystring
//     ctx.body = {
//         url,
//         ctx_query,
//         ctx_querystring
//     }
// })

// app.listen(3002, (req, res) => {
// })
app.listen(8085, "192.168.0.184");
