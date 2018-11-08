const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const config = require('./config/config');
const db = require('./app/models/index');
const glob = require('glob');
const cors = require('koa-cors');
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
app.use(cors());

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
glob.sync('./app/controllers/*.js').forEach(controller => require(controller)(app));

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

async function start() {
  await db.sequelize.sync();
  let server = app.listen(config.port);
  // server.timeout = config.app.timeout;
  console.log('listen on port ' + config.port);
}
start();