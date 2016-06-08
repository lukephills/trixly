switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack/webpack.prod.config');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack/webpack.karma.config');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack/webpack.dev.config');
}