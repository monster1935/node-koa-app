<!-- 添加用户表单 -->
<template>
    <div class="user-add">
        <el-form :model="userModel" :rules="rules" ref="userForm" label-width="80px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="userModel.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userModel.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userModel.password" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="avatar">
                <el-input v-model="userModel.avatar" placeholder="请输入"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn-dialog">
            <el-button type="primary" @click="onBtnAdd">立即创建</el-button>
            <el-button @click="onBtnReset">重置</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isEdit: {
                type: Boolean,
                default: false
            },
            userInfo: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                userModel: {
                    name: '',
                    username: '',
                    password: '',
                    avatar: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '密码', trigger: 'blur' },
                    ],
                    avatar: [
                        { required: true, message: '请输入备注', trigger: 'blur' },
                    ]
                }
            };
        },
        components: {},
        mounted() {
            if (this.isEdit) {
                this.userModel = JSON.parse(JSON.stringify(this.userInfo));
            }
        },
        methods: {
            // 创建用户
            onBtnAdd () {
                let url = this.isEdit ? '/v1/editUser' : '/v1/addUser';
                let params = {};
                this.$http.post(url, this.userModel).then (res => {
                    if (res.data.resCode == 100) {
                        this.$message({
                            type: 'success',
                            message: this.isEdit ? '更新成功！' : '创建成功！'
                        });
                    } else {
                        this.$message.error(res.data.resDesc);
                    }
                    this.$emit('dialogClose');
                });
            },
            // 重置
            onBtnReset () {
                this.$refs['userForm'].resetFields();
            }
        },
        computed: {},
        watch: {}
    };
</script>

<style lang="scss" scoped>
    .user-add {
        overflow: hidden;
        .btn-dialog {
            float: right;
        }
    }
</style>
