const router = require('koa-router')();
const db = require('../models');

router.post('/api/addCategory', async (ctx) => {

  let formData = ctx.request.body;

  try {
    await db.category.create({
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

router.post('/api/delCategory', async (ctx) => {
  let formData = ctx.request.body;
  try {
    await db.category.destroy({
      where: {
        c_id: formData.c_id
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

router.get('/api/getCategoryList', async (ctx) => {
  try {
    let sql = 'select * from category';
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