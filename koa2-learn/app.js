const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const pv = require("./middleware/koa-pv")
const mongoose = require('mongoose')
const dbConf = require('./dbs/config.js')
const session = require("koa-generic-session")
const redisStore = require("koa-redis")
app.keys = ["key", "keysInfo"]
app.use(session({
  key: "mt",
  prefix: "mtpr",
  store: new redisStore({
    port: 6379,
    host: "106.13.46.252",
    password: 'redis1.q_252'
  })
}))
mongoose.connect(dbConf.dbs, {
  useNewUrlParser: true
})
// error handler
onerror(app)
app.use(pv());
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
