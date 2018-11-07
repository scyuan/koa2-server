const router = require('koa-router')();
const db = require('../models');

router.post('/api/addTag', async (ctx) => {
  let formData = ctx.request.body;
  try {
    await db.tag.create({
      ...formData
    })
    ctx.body = {
      code: 1,
      message: 'ok'
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      message: error.message
    }
  }
})

module.exports = app => app.use(router.routes());