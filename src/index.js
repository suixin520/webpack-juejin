require('./style.less');
require('./index.css');
// const { log } = require('./utils')
const format = require('utils/format');
const log = require('log');

log(format('alias success~'));
/* eslint-disable-next-line */
log(CONSTANTS.APP_VERSION);
console.log('hello webpack~');