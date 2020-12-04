import Router from "koa-router";
import poi from "../dbs/models/poi";

const router = new Router({
  prefix: "/poi"
});
router.get("/top", async ctx => {
  try {
    let top = await poi.find({
      name: new RegExp(ctx.query.input),
      city: ctx.query.city
    });
    ctx.body = {
      code: 1,
      data:
        (top &&
          top.length > 0 &&
          top.map(item => {
            return {
              name: item.name,
              type: item.type
            };
          })) ||
        [],
      message: "获取成功"
    };
  } catch (err) {
    ctx.body = {
      code: 0,
      data: null,
      message: "获取失败"
    };
  }
});
router.get("/hotPlace", async ctx => {
  try {
    let res = await poi.find({
      type: "美食"
    });

    ctx.body = {
      code: 1,
      data: res.map(item => item.name),
      message: "获取成功"
    };
  } catch (err) {
    ctx.body = {
      code: 0,
      data: [],
      message: "获取失败"
    };
  }
});

export default router;
