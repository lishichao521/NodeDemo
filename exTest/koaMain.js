const Koa = require('koa')
const router = require('koa-router')();
const link = require("./middleware/logger-generator.js")
const cors = require('koa2-cors');
var bodyParser = require('koa-bodyparser');
const app = new Koa()
app.use(cors())
app.use(bodyParser())
app.use(router.routes());
let postD = ''
let getD = ''
async function postReq(data, url) {
    await link.PostRequest(data, url)
        .then(res => {
            postD = res
        })
}
async function getReq(data, url) {
    await link.GetRequest(data, url)
        .then(res => {
            getD = res
        })
}
app.use(async (ctx) => {
    if (ctx.method === "POST") {
        await postReq(ctx.request.body, ctx.url)
        ctx.body = postD
    } else if (ctx.method === "GET") {
        await getReq(ctx.query, ctx.url)
        ctx.body = getD
    }
})

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

app.listen(3001, () => {
    //   console.log('[demo] request get is starting at port 3000')
})