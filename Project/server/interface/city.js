import Router from 'koa-router';
const router = new Router({
  prefix: '/city'
});
router.get('/list', async ctx => {
  ctx.body = {
    code: 1,
    message: '请求成功',
    list: ['北京', '天津']
  };
});
export default router;
