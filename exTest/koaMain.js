const Koa = require('koa')
const router = require('koa-router')();
const link = require("./middleware/logger-generator.js")
const app = new Koa()
app.use(router.routes());
router.post('/abcd', async (ctx) => {
    let D = ''
    await link.PostRequest(ctx.query)
    .then(res => {
        D = res
    })
    console.log(111,D)
    // let url = ctx.url
    // let ctx_query = ctx.query
    // let ctx_querystring = ctx.querystring
    ctx.body = D
})
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