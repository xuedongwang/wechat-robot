const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa()
const router = new KoaRouter()

router.get(`/*`, async (ctx) => {
  ctx.body = {
    code: 0,
    data: {},
    message: 'success'
  }
})

app.use(router.allowedMethods()).use(router.routes())

app.listen(9000, () => {
  console.log(`Server start on http://localhost:9000`);
})

