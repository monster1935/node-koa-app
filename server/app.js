import Koa from 'koa';
import config from './config';

const app = new Koa();

app.use( async(ctx) => {
    ctx.body = 'hello koa2';
});

app.listen(config.port || 3000);
console.log('[demo] node-koa-app is starting at port 3000')
