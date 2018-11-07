const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    db: 'mysql://root@localhost/koa2_server',
    port: 3333
  }
}

module.exports = config[env];