import Koa from 'koa';
import config from './config';
import router from './router';
const app = new Koa();


// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());


app.listen(config.port || 3000);
console.log('[demo] node-koa-app is starting at port 3000')
