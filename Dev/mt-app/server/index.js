// const Koa = require("koa");
import Koa from "koa";
// const consola = require("consola");
import consola from "consola";
// const { Nuxt, Builder } = require("nuxt");
import { Nuxt, Builder } from "nuxt";
// const router = require("koa-router")();
import router from "koa-router";
// const bodyParser = require("koa-bodyparser");
import bodyParser from "koa-bodyparser";
// const Monk = require("monk");
// const cors = require("koa-cors");
import cors from "koa-cors";
// const convert = require("koa-convert");
import convert from "koa-convert";
import mongoose from "mongoose";
// import mongodb from "mongodb";
import session from "koa-generic-session";
import redis from "koa-redis";
import json from "koa-json";
import dbConfig from "./dbs/config";
import passport from "./interface/utils/passport";
import user from "./interface/users";

// import apis from "./routes/api";
// const api = require("./routes/api");
const app = new Koa();

// //拦截静态资源 开始
// const static = require("koa-static");
// const staticpath = "./static/";
// app.use(
//   static(path.join(__dirname, staticpath), {
//     immutable: true
//   })
// );
// 路由处理，在api中
// app.use(apis.routes(), apis.allowedMethods());

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

// 进行requestbody解析
app.use(
  bodyParser({
    extendTypes: ["json", "form", "text"]
  })
);
app.keys = ["mt", "mtKeys"];
app.proxy = true;
app.use(
  session({
    key: "mt",
    prefix: "mt:uid",
    store: new redis({
      host: dbConfig.redis.host,
      port: dbConfig.redis.port,
      password: dbConfig.redis.password
    })
  })
);
app.use(json());
// 连接数据库
// mongodb.MongoClient.connect(dbConfig.dbs.host, {
//   useNewUrlParser: true
// });
mongoose.connect(dbConfig.dbs.host, {
  useNewUrlParser: true
});
app.use(passport.initialize());
app.use(passport.session());
// 加入路由
app.use(router().routes());
// 处理跨域
app.use(convert(cors()));
// Import and Set Nuxt.js options
import config from "../nuxt.config.js";
// let config = require();
config.dev = !(app.env === "production");

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  app.use(user.routes()).use(user.allowedMethods());
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
