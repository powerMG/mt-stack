import Router from "koa-router";
import meuns from "../dbs/models/menus";
const router = new Router({
  prefix: "/menus"
});
router.get("/getMenuList", async ctx => {
  let result = await meuns.find();
  if (result) {
    ctx.body = {
      code: 1,
      msg: "获取成功",
      data: result[0]
    };
  } else {
    ctx.body = {
      code: 0,
      msg: "获取失败",
      data: null
    };
  }
});
export default router;
