const Koa = require("koa");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser");
// const Monk = require("monk");
const cors = require("koa-cors");
const convert = require("koa-convert");

import apis from "./routes/api";
// const api = require("./routes/api");
const app = new Koa();

// 进行requestbody解析
app.use(bodyParser());
// 加入路由
app.use(router.routes());
// 处理跨域
app.use(convert(cors()));
// 路由处理，在api中
app.use(apis.routes(), apis.allowedMethods());

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(app.env === "production");

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(ctx => {
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on("close", resolve);
      ctx.res.on("finish", resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject);
      });
    });
  });

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
