const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    db: 'mysql://root@localhost/koa2_server',
  }
}

module.exports = config[env];