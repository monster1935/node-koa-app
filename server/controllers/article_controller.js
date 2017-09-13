import Article from '../models/article';

// 添加文章
export async function addArticle(ctx) {
    const title = ctx.request.body.title,
        content = ctx.request.body.content,
        tags = ctx.request.body.tags,
        categories = ctx.request.body.categories,
        createTime = new Date(),
        lastEditTime = new Date();

    const article = new Article({
        title,
        content,
        tags,
        categories,
        createTime,
        lastEditTime
    });
    let createResult = await article.save().catch(err => {
        ctx.throw(500, '服务器内部错误')
    });
    ctx.body = {
        resCode: 100,
        resDesc: '成功',
        dataList: [],
        data: createResult
    };
}
// 获取所有文章
export async function getAllArticles(ctx) {
    let getRes = await Article.find().catch(err => {
        ctx.throw(500,'服务器内部错误');
    });
    ctx.body = {
        resCode: 100,
        resDesc: '成功',
        dataList: getRes,
        data: {}
    };
}
// 删除文章
export async function delArticle (ctx) {
    const id = ctx.request.body.id;
    if (id) {
        const article = await Article.findByIdAndRemove(id).catch(err => {
            if (err.name === 'CastError') {
                ctx.throw(400, 'id不存在');
            } else {
                ctx.throw(500, '服务器内部错误');
            }
        });
        ctx.body = {
            resCode: 100,
            resDesc: '成功',
            dataList: article,
            data: {}
        };
    }
};
