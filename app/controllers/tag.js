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

router.post('/api/delTag', async (ctx) => {
  let formData = ctx.request.body;
  try {
    await db.tag.destroy({
      where: {
        name: formData.name
      }
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

router.get('/api/getTagList', async (ctx) => {
  try {
    let sql = 'select * from tag';
    let result = await db.sequelize.query(sql, {
      type: db.Sequelize.QueryTypes.SELECT
    });
    ctx.body = {
      code: 1,
      data: result
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      message: error.message
    }
  }
})

module.exports = app => app.use(router.routes());