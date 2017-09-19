<!-- 文章管理页 -->
<template>
    <div class="article-wrap">
        <div class="article-list">
            <div class="query-wrap">
                <el-input v-model="name" icon="search" @keyup.enter.native="onQueryClick"></el-input>
            </div>
            <ul class="article-list-wrap">
                <li v-for="(post, index) in tableData">
                    <p>
                        <span class="title">{{post.title}}</span>
                        <span class="time">{{post.createTime}}</span>
                    </p>
                    <p>
                        <span class="categories">
                            <i class="iconfont icon-file"></i>
                            {{post.categories}}
                        </span>
                        <span class="btn">
                            <el-button type="text" @click="onArticleDel(index)">删除</el-button>
                            <el-button type="text" @click="onArticleEdit(index)">编辑</el-button>
                        </span>
                    </p>
                </li>
                <li>共计{{tableData.length}}篇日志</li>
            </ul>
        </div>
        <div class="article-edit-wrap">
            <div class="article-info">
                <el-form :model="articleModel" ref="articleForm">
                    <el-form-item prop="title">
                        <el-input
                            v-model="articleModel.title"
                            placeholder="请输入文章标题">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="tags">
                        <el-input
                            v-model="tags"
                            placeholder="请输入文章标签，Enter添加"
                            @keyup.enter.native="onAddTags">
                        </el-input>
                    </el-form-item>
                    <el-form-item v-show="articleModel.tags.length > 0">
                        <el-tag
                            v-for="(tag,index) in articleModel.tags"
                            :key="tag"
                            :closable="true"
                            @close="handleClose(index)"
                            type="gray">
                            {{tag}}
                        </el-tag>
                    </el-form-item>
                    <el-form-item  prop="categories">
                        <el-input v-model="articleModel.categories" placeholder="请输入文章分类"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <markdown-editor
                v-model="content"
                ref="markdownEditor"
                preview-class="markdown-body"
                :highlight="true">
            </markdown-editor>
            <div class="btn-article">
                <el-button type="primary" @click="onBtnSubmit">发布</el-button>
                <el-button @click="onBtnReset">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import markdownEditor from 'vue-simplemde/src/markdown-editor';
    import hljs from 'highlight.js';
    window.hljs = hljs;
    export default {
        data () {
            return {
                name: '',
                tableData: [],
                content: '',
                tags: '',
                articleModel: {
                    title: '',
                    tags: [],
                    categories: ''
                },
                articleInfo: {},
                isEdit: false
            };
        },
        components: {
            markdownEditor
        },
        mounted() {
            this.getAllArticles();
        },
        methods: {
            onQueryClick () {
                this.$http.post('/v2/articleList',{ title: this.name}).then(res => {
                    if (res.data.resCode == 100) {
                        this.tableData = res.data.dataList;
                    } else {
                        this.$message.error(res.data.resDesc);
                    }
                });
            },
            // 获取所有文章
            getAllArticles () {
                this.$http.post('/v2/articleList').then(res => {
                    if (res.data.resCode == 100) {
                        this.tableData = res.data.dataList;
                    } else {
                        this.$message.error(res.data.resDesc);
                    }
                });
            },
            // 标签页添加
            onAddTags () {
                if (this.tags) {
                    this.articleModel.tags.push(this.tags);
                    this.tags = '';
                }
            },
            // 标签页删除
            handleClose (index) {
                this.articleModel.tags.splice(index,1);
            },
            // 提交
            onBtnSubmit () {
                if (this.isEdit ) {
                    this.$http.post('/v2/updateArticle', {
                        _id: this.articleInfo._id,
                        title: this.articleModel.title,
                        tags: this.articleModel.tags,
                        categories: this.articleModel.categories,
                        content: this.content
                    }).then(res => {
                        if (res.data.resCode == 100) {
                            this.$message({
                                type: 'success',
                                message: '更新成功'
                            });
                            this.getAllArticles();
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.resDesc
                            });
                        }
                    });
                } else {
                    this.$http.post('/v2/addArticle',{
                        title: this.articleModel.title,
                        tags: this.articleModel.tags,
                        categories: this.articleModel.categories,
                        content: this.content,
                    }).then(res => {
                        if (res.data.resCode == 100) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.getAllArticles();
                        }
                    });
                }
            },
            // 删除
            onArticleDel (index) {
                let id = this.tableData[index]._id;
                this.$confirm('是否删除该文章？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/v2/delArticle', {id: id}).then(res => {
                        if (res.data.resCode == 100) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.getAllArticles();
                        }else {
                            this.$message.error(res.data.resDesc);
                        }
                    });
                }).catch(()=>{});
            },
            // 编辑
            onArticleEdit (index) {
                this.isEdit = true;
                this.articleInfo = this.tableData[index];
                this.articleModel.tags = this.articleInfo.tags;
                this.articleModel.categories = this.articleInfo.categories;
                this.articleModel.title = this.articleInfo.title;
                this.content = this.articleInfo.content;
            },
            // 重置
            onBtnReset () {
                // 1. 文章信息form reset
                this.$refs['articleForm'].resetFields();
                // 2. 文章标签清空
                this.tags = '';
                this.articleModel.tags = [];
                // 3. markdown edit重置
                this.content = '';
                // 4. 文章编辑信息清空
                this.articleInfo = {};
                // 5. 置文章状态为新建
                this.isEdit = false;
            }
        },
        computed: {},
        watch: {}
    };
</script>

<style lang="scss">
 @import '~simplemde/dist/simplemde.min.css';
 @import '~github-markdown-css';
 @import '~highlight.js/styles/atom-one-dark.css';
 .border {
     border: 1px solid #ddd;
     border-radius: 4px;
     padding: 20px;
 }
 .el-form-item.small {
     width: 50%;
 }
 .el-form-item {
     .el-tag + .el-tag {
         margin-left: 4px;
     }
 }
 .article-wrap .el-table tr {
     height: 80px;
     cursor: pointer;
 }
 .markdown-editor {
     height: 60%;
     overflow: hidden;
     .editor-toolbar {
         border-radius: 0;
     }
     .CodeMirror {
         height: 80%;
         border-raidus: 0;
         border-color: #ddd;
     }
 }
 .article-wrap .el-input input {
     border-radius: 0;
     border-color: #ddd;
 }
 .el-input__inner::placeholder {
     color: #ccc;
 }
</style>
<style lang="scss" scoped>
    .article-wrap {
        display: flex;
        flex-flow: row;
        height: 100%;
        .article-list {
            flex: 1;
            height: 100%;
            overflow-y: auto;
            max-width: 400px;
            border-right: 1px solid #ddd;
            .query-wrap {
                height: 60px;
                border-bottom: 1px solid #ddd;
                line-height: 60px;
            }
            .article-list-wrap {
                margin: 0;
                padding: 0;
                list-style: none;
                li {
                    height: 80px;
                    &:last-child {
                        height: 30px;
                        font-size: 16px;
                    }
                    border-bottom: 1px solid #ddd;
                    padding: 10px 20px;
                    cursor: pointer;
                    overflow: hidden;
                    &:focus {
                        background: #E0EAFA;
                    }
                    &:hover {
                        background: #F6F7F9;
                        .btn {
                            display: block;
                        }
                    }
                    font-size: 14px;
                    .title {
                        font-size: 16px;
                        display: inline-block;
                        max-width: 240px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .time {
                        float: right;
                        color: #999;
                    }
                    .categories{
                        margin-right: 10px;
                        color: #999;
                    }
                    .btn {
                        float: right;
                        display: none;
                    }
                }
            }
        }
        .article-edit-wrap {
            flex: 1;
            overflow: auto;
            height: 100%;
            box-sizing: border-box;
            padding: 20px;
            .btn-article {
                position: absolute;
                right: 40px;
                margin: 20px 0;
            }
        }

    }
</style>
