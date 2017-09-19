<template>
    <div class="admin-login">
        <div class="login-wrap">
            <el-form :model="loginModel" :rules="rules" ref="loginForm">
                <h3 class="login-title">系统登录</h3>
                <el-form-item prop="username">
                    <el-input icon="search" v-model="loginModel.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="psd">
                    <el-input
                        icon="search"
                        v-model="loginModel.psd"
                        type="password"
                        placeholder="密码"
                        @keyup.enter.native="onLogin">
                    </el-input>
                </el-form-item>
                <el-button class="btn-log" type="primary" @click="onLogin">登 录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                loginModel: {
                    username: 'admin',
                    psd: '123445'
                },
                rules: {
                    username: [
                        {required: true, message: '请输入正确的用户名', trigger: 'blur' }
                    ],
                    psd: [
                        {required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            };
        },
        components: {},
        mounted() {},
        methods: {
            // 登录
            onLogin () {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        // do next
                        this.$store.dispatch('login', this.loginModel).then((res) => {
                            if (res.data.resCode == 100) {
                                this.$message({
                                    type: 'success',
                                    message: '登录成功！',
                                });
                                setTimeout(()=> {
                                    this.$router.push('/admin');
                                }, 1000);
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.resDesc
                                });
                            }
                        });
                    } else {
                        // error
                        return false;
                    }
                });
            }
        },
        computed: {},
        watch: {}
    };
</script>
<style lang="scss" scoped>
    .admin-login {
        height: 100%;
        background: #2d3a4b;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: -20%;
        .login-wrap {
            width: 330px;
            height: 400px;
            text-align: center;
            .login-title {
                color: #eee;
                font-size: 26px;
                font-weight: 700;
            }
            .btn-log {
                width: 100%;
            }
        }
    }
</style>

<style lang="scss">
    .admin-login .login-wrap .el-input {
        input {
            background: transparent;
            color: #eee;
            padding-left: 35px;
            padding-right: 10px;
            height: 47px;
        }
        .el-input__icon {
            left: 0;
        }
    }
</style>
