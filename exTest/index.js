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
    encoding: "gzip",
    formidable: {
      uploadDir: path.join(__dirname, "upload/"), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
      }
    }
  })
);
app.use(router.routes());

app.use(async ctx => {
  if (ctx.method === "POST") {
    if (ctx.url === "/uploadfile") {
      // 上传单个文件
      console.log(222, ctx.request.files);
      // const file = ctx.request.files.file; // 获取上传文件
      // // 创建可读流
      // const reader = fs.createReadStream(file.path);
      // let filePath = path.join(__dirname, "public/upload/") + `/${file.name}`;
      // // 创建可写流
      // const upStream = fs.createWriteStream(filePath);
      // // 可读流通过管道写入可写流
      // reader.pipe(upStream);
      ctx.body = { code: 0,url: ctx.request.files.file.path, msg: "上传成功！" };
      // return (ctx.body = "上传成功！");
    } else if (ctx.url === "/uploadfiles") {
      // 上传多个文件
      const files = ctx.request.files.file; // 获取上传文件
      for (let file of files) {
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        let filePath = path.join(__dirname, "public/upload/") + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
      }
      ctx.body = { res: 0, msg: "上传成功！" };
      // return (ctx.body = "上传成功！");
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
io.on("connection", function(socket) {
  io.sockets.emit("updatePerson", {
    userNumber: io.sockets.server.eio.clientsCount
  });
  console.log(111, infoData);
  socket.emit("chatInfo", { is: "ok", data: infoData });
  // 监听客户端发来的消息
  socket.on("sendInfo", function(data) {
    if (infoData.length === 100) {
      infoData.shift();
    }
    infoData.push(data);
    console.log(111, data);
    console.log(333, infoData);
    io.sockets.emit("chatInfo", { data: data });
  });
  //客户端断开连接
  socket.on("disconnect", function(socket) {
    console.log("b");
    io.sockets.emit("updatePerson", {
      userNumber: io.sockets.server.eio.clientsCount
    });
  });
});
server.listen(1337, "0.0.0.0");
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
app.listen(80, "0.0.0.0");
