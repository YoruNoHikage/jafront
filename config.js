var merge = require('lodash/merge');

module.exports = merge({}, require('./config.default.json'), require('./config.json') || {});
