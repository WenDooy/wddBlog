<template>
    <el-row class="sharelistBox" v-loading="loading">
        <div v-if="this.$route.name === 'ArticleList' && !this.$route.query.keywords" class="shareTitle">
        </div>

        <el-col :span="24" class="s-item tcommonBox" v-for="(item, index) in artList" :key="'article'+index">
            <header>
                <h1>
                    <router-link :to="'/ArticleDetail?aid='+item.id" target="_blank">
                        {{item.title}}
                    </router-link>
                </h1>
                <h2>
                    <i class="el-icon-user myicon"></i>发表于
                    <i class="el-icon-date myicon"></i>
                    <span>
                        {{item.create_time}}
                    </span>
                    <!--                    <i class="el-icon-chat-line-round myicon"></i>{{}}条-->
                    <i class="el-icon-postcard myicon"></i>
                    <a href="#" @click="queryCategory(item.categoryId)">{{item.tags[0]}}</a>
                </h2>
            </header>
            <div class="article-content">
                <p style="text-indent: 2em;">
                    {{item.description}}
                </p>
                <p style="max-height: 300px; overflow: hidden; text-align: center;">
                    <img v-if="item.hasOwnProperty('image')" :src="item.image" alt="img" class="maxW">
                </p>
            </div>
            <div class="viewdetail">
                <router-link :to="'/ArticleDetail?aid='+item.id" class="tcolors-bg" target="_blank">
                    阅读全文
                </router-link>
            </div>
        </el-col>
        <el-col class="viewmore">
            <a href="javasript:void(0);" class="tcolors-bg" v-show="hasMore" @click="addMoreFun">点击加载</a>
            <a href="javasript:void(0);" class="tcolors-bg" v-show="!hasMore">无更多数据</a>
        </el-col>
    </el-row>
</template>

<script>

    import {mapGetters} from 'vuex'
    export default {
        name: "articleList",
        data() {
            return {
                hasMore: false,
                artList: [],
                categoryId: 0,
                keywords: '',
                loading: true
            }
        },
        computed: {
            ...mapGetters([
                'articleList',
                'categoryList',
                "commentList"
            ])
        },
        methods: {
            getArticleList() {
                this.categoryId = this.$route.params.id === undefined ? undefined : parseInt(this.$route.params.id);
                this.keywords = this.$store.state.keywords;
                this.artList = [];
                this.artList = this.articleList;
                if (this.categoryId === undefined) {
                    this.artList = this.articleList
                } else {
                    this.$store.dispatch('queryCategory', this.categoryId);
                    this.artList = this.articleList
                }
            },
            queryCategory(categoryId) {
                this.$router.push({
                    name: 'Article',
                    params: {
                        id: categoryId
                    }
                })
            },
            addMoreFun() {
                this.getArticleList();
            }
        },
        watch: {
            '$route': 'routeChange',
            '$store.state.keywords': 'routeChange',
            'articleList': function () {
                this.getArticleList();
            }
        },
        created() {
            this.$store.dispatch('getArticle');
            this.$nextTick(function () {
                this.loading = false
            })
        }
    }
</script>

<style scoped>
    /*分享标题*/
    .shareTitle {
        margin-bottom: 40px;
        position: relative;
        border-radius: 5px;
        background: #fff;
        padding: 15px;
    }

    /*文章列表*/
    .sharelistBox {
        transition: all 0.5s ease-out;
        font-size: 15px;
        margin-top: 20px;
    }

    .viewdetail a {
        background: #666666;
    }

    .viewmore a {
        color: rgba(51, 51, 79, 0.8);
        background: #efefef;
    }

    .myicon {
        margin-left: 10px;
        margin-right: 2px;
    }

</style>
