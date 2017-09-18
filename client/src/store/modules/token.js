// 全局token的管理
export default {
    state: {
        token: sessionStorage.getItem('blog-token')
    },
    mutations: {
        SET_TOKEN (state, token) {
            state.token = token;
            sessionStorage.setItem('blog-token', token);
        },
        DEL_TOKEN (state) {
            state.token = null;
            sessionStorage.setItem('blog-token', '');
        }
    },
    getters: {

    },
    actions: {
        // 登录
        login ({commit}, {username, psd}) {
            // fetch api
            return new Promise((resolve, reject) => {
                $http.post('/v1/login',{username, psd}).then(res => {
                    if (res.data.resCode == 100) {
                        // 记录token
                        commit('SET_TOKEN',res.data.data);
                        resolve(res);
                    } else {
                        // 删除token
                        commit('DEL_TOKEN');
                        reject();
                    }
                });
            });

        }
    }
}
