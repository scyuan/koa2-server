const router = require('koa-router')();
const db = require('../models');

router.post('/api/addArticle', async (ctx) => {
  const formData = ctx.request.body;
  formData.a_id = new Date().getTime();
  try {
    await db.article.create({
      ...formData
    })
    ctx.body = {
      code: 1,
      message: 'ok',
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: -1,
      message: error.message,
    }
  }
})
router.post('/api/getArticle', async (ctx) => {
  try {
    let sql = `select * from article where a_id = ${ctx.request.body.a_id}`;
    let result = await db.sequelize.query(sql, {
      type: db.Sequelize.QueryTypes.SELECT
    })
    if (result.length <= 0) {
      ctx.body = {
        code: 2,
        message: 'article is not exit'
      }
    } else {
      ctx.body = {
        code: 1,
        message: 'ok',
        data: result[0]
      }
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      message: error.message
    }
  }
})

router.post('/api/getArticleList', async (ctx) => {
  const formData = ctx.request.body;

  let sql = 'select * from category right join article on category.c_id = article.category where 1=1 ';
  let query = '';
  Object.keys(formData).forEach(key => {
    if (key == 'pagination') return;
    if (key == 'tag') {
      query = query + `and tag like '%${formData.tag}%' `;
      return;
    }
    query = query + `and ${key} = ${formData[key]} `
  })

  sql = sql + query;

  try {
    let result = await db.sequelize.query(sql, {
      type: db.Sequelize.QueryTypes.SELECT
    })
    ctx.body = {
      code: 1,
      message: 'ok',
      data: result
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      message: error.message,
    }
  }
})

router.post('/api/deleteArticle', async (ctx) => {
  try {
    await db.article.destroy({
      where: {
        a_id: ctx.request.body.a_id
      }
    })
  } catch (error) {
    ctx.body = {
      code: -1,
      message: error.message,
    }
  }
})

router.post('/api/updateArticle', async (ctx) => {
  const formData = ctx.request.body;

  let sql = 'update article set ';

  let query = '';

  console.log(formData);

  Object.keys(formData).forEach(key => {
    if (key != 'a_id') query = query + ` ${key} = '${formData[key]}' ,`
  })

  query = query.substring(0, query.length - 1);

  sql = sql + query + ` where a_id = ${formData.a_id}`;

  try {
    await db.sequelize.query(sql, {
      type: db.Sequelize.QueryTypes.UPDATE
    })
    ctx.body = {
      code: 1,
      message: 'ok',
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      message: error.message,
    }
  }

})

module.exports = app => app.use(router.routes());