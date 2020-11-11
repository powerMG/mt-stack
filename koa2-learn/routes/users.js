const router = require('koa-router')()
const Router = require('koa-router')
const Person = require('../dbs/models/person')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
/**
 * 增加一条人员信息
 */
router.post('/addPerson', async function (ctx, next) {
  const _person = new Person({ name: ctx.request.body.name, age: ctx.request.body.age });
  let _code;
  try {
    await _person.save();
    _code = 1;
  } catch (err) {
    _code = 0;
  }
  ctx.body = {
    code: _code
  }
})
router.get('/getPerson', async function (ctx) {
  let _code, _message;
  let _result = null;
  try {
    _result = await Person.find();
    _code = 1;
    _message = "请求成功";
  } catch (err) {
    _code = 0;
    _message = "请求失败";
  }
  ctx.body = {
    code: _code,
    data: _result,
    message: _message
  }
})
router.post("/updatePersionAgeByName", async function (ctx) {
  let _code, _message;
  let _result = null;
  try {
    _result = await Person.where({
      name: ctx.request.body.name
    }).update({
      age: ctx.request.body.age
    })
    _code = 1;
    _message = "修改成功";
  }
  catch (err) {
    _code = 0;
    _message = "修改失败";
  }
  ctx.body = {
    code: _code,
    message: _message,
    data: _result
  }
})
router.post("/removePersionByName", async function (ctx) {
  let _code, _message;
  let _result = null;
  try {
    _result = await Person.where({
      name: ctx.request.body.name
    }).remove();
    _code = 1;
    _message = "删除成功"
  }
  catch (err) {
    _code = 0;
    _message = "删除失败"
  }
  ctx.body = {
    code: _code,
    message: _message,
    data: _result
  }
})
module.exports = router
