import Router from "koa-router";
import Redis from "koa-redis";
import NodeMalier from "nodemailer";
import User from "../dbs/models/users";
import Config from "../dbs/config";
import Passport from "./utils/passport";
import axios from "./utils/axios";
import config from "../dbs/config";
let Store = new Redis({
  host: Config.redis.host,
  port: Config.redis.port,
  password: Config.redis.password
}).client;
/**
 * 注册接口实现
 */
const router = new Router({
  prefix: "/users"
});
router.post("/signup", async ctx => {
  console.log(ctx.request.body);
  const { username, password, email, code } = ctx.request.body;
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, "code");
    const saveExpire = await Store.hget(`nodemail:${username}`, "expire");
    console.log("开始校验时效");
    if (code === saveCode) {
      // 校验过期时间
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: 0,
          msg: "验证码已失效，请重新获取"
        };
        return false;
      }
    } else {
      ctx.body = {
        code: 0,
        msg: "输入的验证码不正确"
      };
      return false;
    }
  } else {
    ctx.body = {
      code: 0,
      msg: "请输入验证码"
    };
    return false;
  }
  let user = await User.find({
    username
  });
  if (user.length) {
    ctx.body = {
      code: 0,
      msg: "账号已注册"
    };
    return false;
  }
  console.log("开始入库");
  // 入库
  let nUser = await User.create({
    username,
    password,
    email
  });
  if (nUser) {
    console.log("开始调用登录接口");
    let res = await axios.post("http://localhost:3000/users/signin", {
      username,
      password
    });
    console.log("登录接口响应" + res);
    if (res.data && res.data.code === 1) {
      ctx.body = {
        code: 1,
        msg: "注册成功",
        user: res.data.user
      };
    } else {
      ctx.body = {
        code: 0,
        msg: "注册失败"
      };
    }
  }
});
/**
 * 登录接口
 */
router.post("/signin", async (ctx, next) => {
  console.log("进入登录接口");
  return Passport.authenticate("local", (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: 0,
        msg: err
      };
    } else {
      if (user) {
        ctx.body = {
          code: 1,
          msg: "登录成功",
          user
        };
        return ctx.login(user);
      } else {
        ctx.body = {
          code: 0,
          msg: info
        };
      }
    }
  })(ctx, next);
});
/**
 * 验证码发送
 */
router.post("/verify", async ctx => {
  let username = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemail:${username}`, "expire");
  if (saveExpire && new Date().getDate() - saveExpire < 0) {
    ctx.body = {
      code: 0,
      msg: "请求过于频繁，1分钟后再试"
    };
    return false;
  }
  let transporter = NodeMalier.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: false,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  });
  let ko = {
    code: config.smtp.code(),
    expire: config.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  };
  // console.log(ko.user);
  let mailOptions = {
    from: `“认证邮件”<${config.smtp.user}>`,
    to: ko.email,
    subject: `实战课程验证码`,
    html: `您正在注册实战课程账号，您的验证码为${ko.code}`
  };
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    } else {
      Store.hmset(
        `nodemail:${ko.user}`,
        "code",
        ko.code,
        "expire",
        ko.expire,
        "email",
        ko.email
      );
    }
  });
  ctx.body = {
    code: 1,
    msg: "已成功发送验证码"
  };
});
/**
 * 退出
 */
router.get("/exit", async ctx => {  
  await ctx.logout();
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 1
    };
  } else {
    ctx.body = {
      code: 0
    };
  }
});

/**
 * 获取用户名
 */
router.get("/getUser", async ctx => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user;
    ctx.body = {
      user: username,
      email
    };
  } else {
    ctx.body = {
      user: null,
      email: null
    };
  }
});
/**
 * 获取用户名
 */
router.get("/aaa", async ctx => {
  ctx.body = {
    list: ["中国"]
  };
});

export default router;
