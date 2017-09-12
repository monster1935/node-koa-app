// 引入babel-core/register 用于babel转换所有的的require的文件
require('babel-core/register');
// babel转化新的js API
require('babel-polyfill');
// 引入服务端主程序
require('./server/app');
