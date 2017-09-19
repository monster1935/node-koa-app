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
// 获取首页文章列表
export async function getIndexList (ctx) {
    const curPage = ctx.request.body.curPage;
    const pageSize = ctx.request.body.pageSize;
    let res;
    res = await Article.find().sort({"createTime":-1}).skip(pageSize*(curPage-1)).limit(pageSize).catch(err => {
        ctx.throw(500, 'internal error');
    });

    ctx.body = {
        resCode: 100,
        resDesc: '成功',
        dataList: res,
        data: {
            curPage,
            pageSize
        }
    };
}
// 获取所有文章,用于归档页的显示
export async function getAllArticles(ctx) {
    let res, query = {};
    let title = ctx.request.body.title;
    if (title) {
        query = {title: new RegExp(title)};
    }
    res = await Article.find(query).sort({"createTime":-1}).select('title categories tags content createTime').catch(err => {
        ctx.throw(500, 'internal error');
    });

    ctx.body = {
        resCode: 100,
        resDesc: '成功',
        dataList: res,
        data: {}
    };
};
// 获取单篇文章信息
export async function getArticleInfo (ctx) {
    let res, params = {};
    const id = ctx.request.body.id;
    const categories = ctx.request.body.categories;
    if (id) {
        params._id = id;
    }
    if (categories) {
        params.categories = categories;
    }
    // 阅读次数+1
    if (id) {
        await Article.update({_id: id}, {$inc: {viewCounts: 1}});
    }
    res = await Article.findOne(params).catch(err => {
        ctx.throw(500, 'internal error');
    });

    ctx.body = {
        resCode: 100,
        resDesc: '成功',
        dataList: [],
        data: res
    };
};
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

// 更新文章
export async function updateArticle (ctx) {
    const id = ctx.request.body._id;
    const article = await Article.findByIdAndUpdate(id, {$set: ctx.request.body}).catch(err => {
        if (err.name == 400) {
            ctx.body = {
                resCode: 400,
                resDesc: 'id不存在',
                dataList: [],
                data: {}
            };
        } else {
            ctx.body = {
                resCode: 500,
                resDesc: '服务器内部错误',
                dataList: res,
                data: {}
            };
        }
    });
    ctx.body = {
        resCode: 100,
        resDesc: '成功',
        dataList: [],
        data: {}
    };
}
