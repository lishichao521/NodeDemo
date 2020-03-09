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
io.on("connection", function(socket) {
    io.sockets.emit("updatePerson", {
        userNumber: io.sockets.server.eio.clientsCount
    });
    // let arrUser = Object.values(io.eio.clients)[0];
    // console.log("链接", Object.values(io.eio.clients)[0].id, io.eio.clientsCount);
    // this.userList = Object.keys(io.eio.clients)
    userList.push(socket.id)
    console.log("aaaaaaaaaa", userList)
    //   console.log(222, infoData);
    //   socket.emit("chatInfo", { is: "ok", data: infoData });
    //   // 监听客户端发来的消息
    //   socket.on("sendInfo", function(data) {
    //     if (infoData.length === 100) {
    //       infoData.shift();
    //     }
    //     infoData.push(data);
    //     console.log(333, infoData);
    //     io.sockets.emit("chatInfo", { data: data });
    //   });
    //返回连接者
    // console.log(io.sockets)
    // let userMsg = io
    // io.sockets.emit("isUser", {
    //     user: userMsg
    // });
    // 监听客户端发来的消息
    socket.on("stream", function(data) {
        console.log(111, data);
        setTimeout(() => {
            io.sockets.emit("sendVideo", { data: data });
        }, 10000);
        // io.sockets.emit("chatInfo", { data: data });
    });
    //客户端断开连接
    socket.on("disconnect", function(socket) {
        console.log("断开");
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
