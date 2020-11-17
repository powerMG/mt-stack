import Router from "koa-router";
const router = new Router({
  prefix: "/api/v1"
});
router.get("/getList", ctx => {
  ctx.body = {
    list: ["北京", "天津", "上海"]
  };
});

export default router;
