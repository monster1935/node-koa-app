import Router from 'koa-router';
import * as $ from '../controllers/users_controller';
let home = new Router();

home.get('/', async(ctx) => {
    let html = `
        <ul>
            <li><a href="/page/helloworld">/page/helloworld</a></li>
            <li><a href="/page/404">/page/404</a></li>
        </ul>
    `;
    ctx.body = html;
});

let v1 = new Router();
v1.post('/users', $.getUserList);
v1.post('/addUser', $.addUser);
v1.post('/delUser', $.delUser);
v1.post('/editUser', $.editUser);

// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
    ctx.body = '404 page!';
}).get('/helloworld', async ( ctx )=>{
    ctx.body = 'helloworld page!';
});

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());
router.use('/v1', v1.routes(), v1.allowedMethods());

export default router;