const Koa = require("koa");
const router = require("koa-router")();
const link = require("./req/req");
const cors = require("koa2-cors");
var bodyParser = require("koa-bodyparser");
var fs = require("fs");
const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(router.routes());

app.use(async ctx => {
  if (ctx.method === "POST") {
    let POST_D = await link.PostRequest(ctx.request.body, ctx.url);
    ctx.body = POST_D;
  } else if (ctx.method === "GET") {
    let GET_D = await link.GetRequest(ctx.query, ctx.url);
    ctx.body = GET_D;
  }
});
var server = require("http").Server(app.callback());
var io = require("socket.io")(server);
let userId = [];
let userIdNum = 0;
let name = "";
io.on("connection", function(socket) {
  console.log('aaa')
  io.sockets.emit("updatePerson", { userNumber: io.sockets.server.eio.clientsCount });
  socket.emit("chatInfo", { is: "ok" });
  // 监听客户端发来的消息
  socket.on("sendInfo", function(data) {
    io.sockets.emit("chatInfo", { data: data });
  });
  // // 获取在线人数
  // socket.on("setUserNumber", function(data) {
  //   name = data;
  //   if (!userId.includes(data)) {
  //     userId.push(data);
  //   }
  //   console.log("a");
  // });
  //客户端断开连接
  socket.on("disconnect", function(socket) {
    for (let i = 0; i < userId.length; i++) {
      if (userId[i] == name) {
        userId.splice(i, 1);
        break;
      }
    }
    console.log("b");
    io.sockets.emit("updatePerson", { userNumber: io.sockets.server.eio.clientsCount });
  });
});
server.listen(1337, "192.168.10.12");
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
app.listen(80, "192.168.10.12");
