<template>
    <div>
        <div class="input">
            <el-input placeholder="文章标题" v-model="article.title"></el-input>

            <el-input
                    style="margin-top: 30px"
                    type="textarea"
                    :rows="5"
                    placeholder="文章简述"
                    v-model="article.description">
            </el-input>
        </div>


        <app-mark-down class="markdown"></app-mark-down>

        <div class="input">
            <div class="tagList">
                <el-tag
                        class="tag"
                        :key="tag"
                        v-for="tag in article.tags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
        </div>

        <div class="button">
            <el-button @click="loginValidation">发布博客</el-button>
            <el-button @click="returnHomePage">返回首页</el-button>
        </div>
    </div>
</template>

<script>
    import markdown from '../components/markdown/index'
    import {mapGetters} from 'vuex'

    export default {
        name: 'write',
        data() {
            return {
                article: {
                    id: 0,
                    title: '',
                    content: '',
                    tags: [],
                    description: '',
                    create_time: '',
                    categoryId: ''
                },
                category: {
                    categoryName: '',
                    categoryId: 0
                },
                inputVisible: false,
                inputValue: ''
            }
        },
        components: {
            appMarkDown: markdown
        },
        computed: {
            ...mapGetters({
                articleList: 'articleList',
                categoryList: 'categoryList',
                articleContent: 'articleContent'
            })
        },
        methods: {
            publishEssay() {
                let findItem = this.categoryList.find(element => element.categoryName === this.article.tags[0]);
                if (findItem === undefined) {
                    this.category.categoryName = this.article.tags[0];
                    this.category.categoryId = this.categoryList.length;
                    this.article.categoryId = this.categoryList.length;
                } else {
                    this.article.categoryId = findItem.categoryId;
                }
                this.article.content = this.articleContent;
                const length = this.articleList.length;
                this.article.id = length;
                this.article.create_time = this.getCreateTime();
                this.$store.dispatch('addCategory', {category: this.category, article: this.article});
                this.$store.dispatch('publishEssay', this.article)
            },
            getCreateTime() {
                // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
                let date = new Date();
                let year = date.getFullYear() + '-';
                let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let day = date.getDate() + ' ';
                let hour = date.getHours() + ':';
                let min = date.getMinutes() + ':';
                let sec = date.getSeconds();
                return year + month + day + hour + min + sec;
                // 输出结果：2014-04-23 18:55:49
            },
            returnHomePage() {
                this.$router.push({path: `/Home`})
            },
            handleClose(tag) {
                this.article.tags.splice(this.article.tags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.article.tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            open() {
                this.$confirm('验证成功, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.publishEssay();
                    this.$message({
                        type: 'success',
                        message: '发送成功!'
                    });
                    this.$router.push({path: `/Home`})
                }).catch((error) => {
                    // console.log(this.category, this.category.categoryId)
                    console.log(error)
                    this.$message({
                        type: 'info',
                        message: '已取消发送'
                    });
                });
            },
            loginValidation() {
                this.$prompt('请输入密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /495832/,
                    inputErrorMessage: '密码不正确'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '验证成功'
                    });
                    this.open()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        },
        created() {
            this.$store.dispatch('getArticle')
            this.$store.dispatch('getCategory')
        }
    }
</script>
<style scoped>
    .input {
        max-width: 80%;
        margin: 40px auto 40px auto;
        text-align: center;
    }

    .input-new-tag {
        margin: 10px;
    }

    .markdown {
        margin-left: 10vw;
        margin-right: 10vw;
    }

    .tagList {
        text-align: left;
        margin: 10px;
    }

    .tag {
        margin-right: 5px;
    }

    .button {
        margin-bottom: 30px;
        text-align: center;
    }
</style>
