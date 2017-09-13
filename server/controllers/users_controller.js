import User from '../models/user';

// 添加用户
export async function addUser (ctx) {
    const name = ctx.request.body.name;
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const avatar = ctx.request.body.avatar;
    const createTime = new Date();
    const user = new User({
        name,
        username,
        password,
        avatar,
        createTime
    });

    let addRes = await user.save().catch(err => {
        ctx.throw(500, 'Internal Error');
    });

    await User.populate(addRes, {path: ''}, function(err, result) {
        addRes = result;
    });
    ctx.body = {
        resCode: 100,
        resDesc: '成功',
        dataList: addRes,
        data: {}
    };
}
// 获取用户列表
export async function getUserList (ctx) {
    const name = ctx.request.body.name;
    const username = ctx.request.body.username;
    if (name || username) {
        let getRes = await User.find({name: name, username:username},function (err, result) {
            ctx.body = {
                resCode: 100,
                resDesc: '成功',
                dataList: result,
                data: {}
            };
        }).catch(err => {
            ctx.throw(500, 'internal error');
        });


    } else {
        let getRes = await User.find({},function (err, result) {
            ctx.body = {
                resCode: 100,
                resDesc: '成功',
                dataList: result,
                data: {}
            };
        }).catch(err => {
            ctx.throw(500, 'internal error');
        });
    }
}
// 删除用户
export async function delUser (ctx) {
    const id = ctx.request.body.id;
    if (id) {
        const user = await User.findByIdAndRemove(id).catch(err => {
            if (err.name === 'CastError') {
                ctx.throw(400, 'id不存在');
            } else {
                ctx.throw(500, '服务器内部错误');
            }
        });
        ctx.body = {
            resCode: 100,
            resDesc: '成功',
            dataList: user,
            data: {}
        };
    }
};
// 更新用户
export async function editUser (ctx) {
    const id = ctx.request.body._id;
    if (id) {
        const user = await User.findByIdAndUpdate(id, { $set: ctx.request.body}).catch(err => {
            if (err.name === 'CastError') {
                ctx.throw(400, 'id不存在');
            } else {
                ctx.throw(500, '服务器内部错误');
            }
        });
        ctx.body = {
            resCode: 100,
            resDesc: '成功',
            dataList: user,
            data: {}
        };
    }
}
