const Koa = require("koa");
const router = require("koa-router")();
const link = require("./req/req");
const cors = require("koa2-cors");
var bodyParser = require("koa-bodyparser");
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
io.on("connection", function(socket) {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function(data) {
    console.log(data);
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
//     //   console.log('[demo] request get is starting at port 3000')
// })
app.listen(80, "192.168.10.12");
