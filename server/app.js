import Koa from 'koa';
import config from './config';
import router from './router';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
// 添加mongoose，用于连接mongodb
import mongoose from 'mongoose';
mongoose.connect(config.mongodb.url,config.mongdbSecret);
mongoose.connection.on('error', console.error);

const app = new Koa();

onerror(app)


app.use(bodyParser());

app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err) => {
    console.log(err)
});

app.listen(config.port || 3000);
console.log('[demo] node-koa-app is starting at port 3000')
