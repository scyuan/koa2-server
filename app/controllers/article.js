const router = require('koa-router')();
const db = require('../models');

router.post('/api/addArticles', async () => {
  const formData = this.request.body;
  await db.article.create({

  })
})

module.exports = app => app.use(router.routes());