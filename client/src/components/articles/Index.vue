<!-- 文章管理页 -->
<template>
    <div class="article-wrap">
        <h2>文章管理</h2>
        <div class="article-info border">
            <el-form :model="articleModel" ref="articleForm" :rules="rules" label-width="80">
                <el-form-item label="文章标题" class="small">
                    <el-input
                        v-model="articleModel.title"
                        placeholder="请输入文章标题">
                    </el-input>
                </el-form-item>
                <el-form-item label="文章标签" class="small">
                    <el-input
                        v-model="tags"
                        placeholder="请输入文章标签，Enter添加"
                        @keyup.enter.native="onAddTags">
                    </el-input>
                </el-form-item>
                <el-form-item v-show="articleModel.tags.length>0">
                    <el-tag
                        v-for="(tag,index) in articleModel.tags"
                        :key="tag"
                        :closable="true"
                        @close="handleClose(index)"
                        type="gray">
                        {{tag}}
                    </el-tag>
                </el-form-item>
                <el-form-item label="文章分类" class="small">
                    <el-input v-model="articleModel.categories" placeholder="请输入文章分类"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <h2>文章编辑</h2>
        <div class="btn-article">
            <el-button type="primary" @click="onBtnSubmit">创建并发布</el-button>
            <el-button>重置</el-button>
        </div>
        <markdown-editor
            v-model="content"
            ref="markdownEditor"
            preview-class="markdown-body"
            :highlight="true">
        </markdown-editor>
        <h2>文章列表</h2>
        <div class="article-list">
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
                        <el-button type="text" @click="onArticleDel(scope.row)">删除</el-button>
                        <el-button type="text" @click="onArticleEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
                tableData: [],
                tableColumn: [
                    {prop: 'title', label: '题目'},
                    {prop: 'tags', label: '标签'},
                    {prop: 'categories', label: '分类'},
                    {prop: 'createTime', label: '创建时间'},
                    {prop: 'lastEditTime', label: '最后修改时间'}
                ],
                content: '',
                tags: '',
                articleModel: {
                    title: '',
                    tags: [],
                    categories: ''
                },
                rules: {

                }

            };
        },
        components: {
            markdownEditor
        },
        mounted() {
            this.getAllArticles();
        },
        methods: {
            getAllArticles () {
                this.$http.post('/v2/articles').then(res => {
                    if (res.data.resCode == 100) {
                        this.tableData = res.data.dataList.reverse();
                    } else {
                        this.$message.error(res.data.resDesc);
                    }
                });
            },
            onAddTags () {
                if (this.tags) {
                    this.articleModel.tags.push(this.tags);
                    this.tags = '';
                }
            },
            handleClose (index) {
                this.articleModel.tags.splice(index,1);
            },
            onBtnSubmit () {
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
                })
            },
            onArticleDel (article) {
                this.$confirm('是否删除该文章？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/v2/delArticle', {id: article._id}).then(res => {
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
            onArticleEdit () {

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
</style>
<style lang="scss" scoped>
    .article-wrap {
        .btn-article {
            margin-bottom: 10px;
        }
    }
</style>
