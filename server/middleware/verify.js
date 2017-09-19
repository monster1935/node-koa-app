import jwt from 'jsonwebtoken';
export default async(ctx, next) => {
    const authorization = ctx.get('Authorization');
    if (!authorization) {
        ctx.body = {
            resCode: 401,
            resDesc: 'no token detected in request headers',
            dataList: [],
            data: {}
        };
        return;
    }
    const token = authorization.split(' ')[1];
    let decode;
    try {
        decode = jwt.verify(token, 'admin');
    } catch (err) {
        if ('TokenExpiredError' == err.name) {
            ctx.body = {
                resCode: 401,
                resDesc: 'token expired',
                dataList: [],
                data: {}
            };
            return;
        }
        ctx.body = {
            resCode: 401,
            resDesc: 'invalid token',
            dataList: [],
            data: {}
        };
    }

    console.log('鉴权成功！');
    await next();
};
