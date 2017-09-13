import Router from 'koa-router';
import * as $ from '../controllers/users_controller';
import * as article from '../controllers/article_controller';

let v1 = new Router();
v1.post('/users', $.getUserList);
v1.post('/addUser', $.addUser);
v1.post('/delUser', $.delUser);
v1.post('/editUser', $.editUser);

let v2 = new Router();
v2.post('/addArticle', article.addArticle);
v2.post('/articles', article.getAllArticles);
v2.post('/delArticle', article.delArticle);
// 装载所有子路由
let router = new Router()
router.use('/v1', v1.routes(), v1.allowedMethods());
router.use('/v2', v2.routes(), v2.allowedMethods());

export default router;
