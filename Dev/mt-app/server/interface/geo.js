import Router from "koa-router";
import axios from "./utils/axios";
import province from "../dbs/models/province";

const router = new Router({
  prefix: "/geo"
});

router.get("/getPosition", async ctx => {
  let { status, data } = await axios.get(
    "http://pv.sohu.com/cityjson?ie=utf-8"
  );
  if (status === 200) {
    let res = data.match(/{\w?.*}/g);
    if (res) {
      ctx.body = {
        code: 1,
        msg: "获取成功",
        data: JSON.parse(res)
      };
    }
  } else {
    ctx.body = {
      code: 0,
      msg: "获取失败",
      data: null
    };
  }
});

/* 查询地区信息 */
router.get("/getProvince", async ctx => {
  let result = await province.find();
  if (result) {
    ctx.body = {
      code: 1,
      msg: "获取成功",
      data: result
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
