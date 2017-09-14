<!-- 用户管理组件 -->
<template>
    <div class="user-wrap">
        <h2>用户查询</h2>
        <div class="user-query border">
            <el-form :model="queryModel" label-width="80px" ref="queryForm">
                <el-form-item label="用户名" class="inline" prop="username">
                    <el-input v-model="queryModel.username" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="姓名" class="inline" prop="name">
                    <el-input v-model="queryModel.name" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <div class="btn-query">
                <el-button type="primary" @click="onUserQuery">查询</el-button>
                <el-button @click="onQueryReset">重置</el-button>
            </div>
        </div>
        <h2>用户列表</h2>
        <div class="user-table border">
            <div class="btn-table">
                <el-button icon="plus" @click="addUser">新增</el-button>
            </div>
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    stripe>
                    <template v-for="column in tableColumn">
                        <el-table-column
                            :prop="column.prop"
                            :label="column.label">
                        </el-table-column>
                    </template>
                    <el-table-column
                        label="操作">
                        <template scope="scope">
                            <el-button type="text" @click="onUserDel(scope.row)">删除</el-button>
                            <el-button type="text" @click="onUserEdit(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog
            :title="isEdit? '编辑用户' : '新增用户'"
            :visible.sync="userAddVis"
            size="tiny">
            <user-add
                v-if="userAddVis"
                @dialogClose="refreshList"
                :is-edit="isEdit"
                :user-info="userInfo">
            </user-add>
        </el-dialog>
    </div>
</template>

<script>
    import UserAdd from './UserAdd';
    export default {
        data () {
            return {
                queryModel: {
                    username: '',
                    name: '',
                },
                userInfo: {},
                isEdit: false,
                userAddVis: false,
                tableData: [],
                tableColumn: [
                    {prop: 'name' , label: '姓名'},
                    {prop: 'username' , label: '用户名'},
                    {prop: 'avatar' , label: '备注'},
                    {prop: 'createTime' , label: '创建时间'}
                ]
            };
        },
        components: {
            UserAdd
        },
        methods: {
            // 获取表格数据
            getTableData (params) {
                this.$http.post('/v1/users',params).then(res => {
                    if (res.data.resCode == 100) {
                        res.data.dataList.forEach(el => {
                            el.createTime = this.$moment(Date.parse(el.createTime)).format('YYYY-MM-DD hh:mm:ss');
                        });
                        this.tableData = res.data.dataList.reverse();
                    } else {
                        this.$message.error(res.data.resDesc);
                    }
                });
            },
            // 新增用户
            addUser () {
                this.isEdit = false;
                this.userAddVis = true;
            },
            refreshList () {
                this.userAddVis = false;
                this.getTableData();
            },
            onUserDel (user) {
                this.$confirm('是否删除该用户？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/v1/delUser', {id: user._id}).then(res => {
                        if (res.data.resCode == 100) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.getTableData();
                        }else {
                            this.$message.error(res.data.resDesc);
                        }
                    });
                }).catch(()=>{});
            },
            // 用户编辑
            onUserEdit (user) {
                this.isEdit = true;
                this.userAddVis = true;
                this.userInfo = user;
            },
            // 用户查询
            onUserQuery () {
                this.getTableData(this.queryModel);
            },
            // 用户查询重置
            onQueryReset () {
                this.$refs['queryForm'].resetFields();
                this.getTableData();
            }
        },
        mounted() {
            this.getTableData();
        },
        computed: {},
        watch: {}
    };
</script>

<style lang="scss" scoped>
    .user-wrap {
        .border {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 20px;
        }
        .user-query {
            overflow: hidden;
            .btn-query {
                float: right;
            }
        }
        .user-table {
            .btn-table {
                margin-bottom: 20px;
            }
        }
    }
</style>
<style lang="scss">
    .el-form-item.inline {
        display: inline-block;
    }
</style>
