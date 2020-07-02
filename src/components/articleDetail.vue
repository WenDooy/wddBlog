<template>
    <div class="detailBox tcommonBox">
        <header>
            <h1>
                <a href="">{{articleDetail.title}}</a>
            </h1>
            <h2>
                <i class="el-icon-user myicon"></i>发表于
                <i class="el-icon-date myicon"></i>
                <span>{{articleDetail.create_time}}</span>
                <!--                <i class="el-icon-chat-line-round myicon"></i>{{commentList.length}}条-->
                <i class="el-icon-postcard myicon"></i>
                <a href="#">{{articleDetail.tags[0]}}</a>
            </h2>
        </header>
        <div class="article-content" v-html="articleDetail.description"></div>
        <!--        <VueShowdown-->
        <!--                markdown="~~test~~"-->
        <!--                flavor="github"-->
        <!--                :options="{ emoji: true }"/>-->
        <div class="markdown-body" v-html="content"></div>
        <div class="dshareBox bdsharebuttonbox" data-tag="share">
            分享到
            <a href="javascript: void(0);" class="ds-weibo fa fa-fw fa-weibo" data-cmd="sina"></a>
            <a href="javascript: void(0);" class="ds-qq fa fa-fw fa-qq" data-cmd="qq"></a>
            <a href="javascript: void(0);" class="ds-wechat fa fa-fw fa-wechat" data-cmd="wechat"></a>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import 'github-markdown-css'
    import showdown from 'showdown'

    export default {
        name: "articleDetail",
        data() {
            return {
                aid: 0,
                articleDetail: '',
                converter: null,
                content: ''
            }
        },
        computed: {
            ...mapGetters([
                'articleList',
                "commentList",
                'articleContent'
            ])
        },
        methods: {
            getArticleDetail() {
                this.aid = this.$route.query.aid === undefined ? 0 : parseInt(this.$route.query.aid);
                // //获取文章信息
                for (let i = 0; i < this.articleList.length; i++) {
                    if (this.articleList[i].id === this.aid) {
                        this.articleDetail = this.articleList[i];
                    }
                }
            },
            initShowdown() {
                const converter = new showdown.Converter()
                this.converter = converter
                // converter.setOption('tables', true)
            },
            setMarkdown() {
                this.content = this.converter.makeHtml(this.articleDetail.content)
            }
        },
        watch: {
            '$route': 'routeChange',
            'articleList': function () {
                this.getArticleDetail()
                this.setMarkdown()
            }
        },
        created() {
            this.$store.dispatch('getArticle');
            this.initShowdown();
        }
    }
</script>

<style lang="less" scoped>
    .detailBox {
        margin-top: 20px;
    }

    .detailBox .article-content {
        font-size: 15px;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
        overflow-x: hidden;
    }

    .detailBox .article-content p {
        margin: 10px 0;
        line-height: 24px;
        word-wrap: break-word;
        word-break: break-all;
        overflow-x: hidden;
    }

    .detailBox .article-content pre {
        word-wrap: break-word;
        word-break: break-all;
        overflow-x: hidden;
    }

    .detailBox .article-content img {
        max-width: 100% !important;
        height: auto !important;
        overflow-x: hidden;
    }

    .detailBox .article-content a {
        color: #df2050 !important;
    }

    .detailBox .article-content a:hover {
        text-decoration: underline;
        color: #f00 !important;
    }

    .detailBox .article-content i {
        font-style: italic;
    }

    .detailBox .article-content strong {
        font-weight: bold;
    }

    .detailBox .article-content ul {
        list-style-type: disc !important;
        list-style: disc !important;
        padding-left: 40px !important;

        li {
            list-style-type: disc !important;
            list-style: disc !important;
        }
    }

    .detailBox .article-content h1, .detailBox .article-content h2, .detailBox .article-content h3 {
        font-size: 200%;
        font-weight: bold;
    }

    .detailBox .article-content h4, .detailBox .article-content h5, .detailBox .article-content h6 {
        font-size: 150%;
        font-weight: bold;
    }

    .detailBox .viewdetail {
        margin: 10px 0;
        line-height: 24px;
        text-align: center;
    }

    /*分享图标*/
    .dshareBox {
        margin-top: 40px;
        position: relative;
    }

    .dshareBox a {
        position: relative;
        display: inline-block;
        width: 32px;
        height: 32px;
        font-size: 18px;
        border-radius: 50%;
        line-height: 32px;
        text-align: center;
        vertical-align: middle;
        margin: 4px;
        background: #fff;
        transition: background 0.6s ease-out;
    }

    .dshareBox .ds-weibo {
        border: 1px solid #ff763b;
        color: #ff763b;
    }

    .dshareBox .ds-weibo:hover {
        color: #fff;
        background: #ff763b;
    }

    .dshareBox .ds-qq {
        color: #56b6e7;
        border: 1px solid #56b6e7;
    }

    .dshareBox .ds-qq:hover {
        color: #fff;
        background: #56b6e7;
    }

    .dshareBox .ds-wechat {
        color: #7bc549;
        border: 1px solid #7bc549;
    }

    .dshareBox .ds-wechat:hover {
        color: #fff;
        background: #7bc549;
    }

    .dshareBox .ds-wechat:hover .wechatShare {
        opacity: 1;
        visibility: visible;
    }

    .detailBox .bdshare-button-style0-32 a {
        float: none;
        background-image: none;
        text-indent: inherit;
    }

    /*点赞 收藏*/
    .dlikeColBox {
        display: inline-block;
        float: right;
    }

    .dlikeBox, .dcollectBox {
        display: inline-block;
        padding: 0 10px;
        height: 35px;
        color: #e26d6d;
        line-height: 35px;
        border-radius: 35px;
        border: 1px solid #e26d6d;
        cursor: pointer;
    }

    /*赞赏*/
    .donate-word {
        margin: 40px 0;
        text-align: center;
    }

    .donate-word span {
        display: inline-block;
        width: 80px;
        height: 34px;
        line-height: 34px;
        color: #fff;
        background: #e26d6d;
        margin: 0 auto;
        border-radius: 4px;
        cursor: pointer;
    }

    .donate-body {
        display: none;
    }

    .donate-body-show {
        display: block;
    }

    .donate-item {
        text-align: right;
    }

    .donate-item:last-child {
        text-align: left;
    }

    .donate-item img {
        width: 100%;
        display: block;
        height: auto;
    }

    .donate-item div {
        display: inline-block;
        width: 150px;
        padding: 0 6px;
        box-sizing: border-box;
        text-align: center;
    }

    .donate-item div span {
        display: inline-block;
        width: 100%;
        margin: 10px 0;
        text-align: center;
    }

    .donate-body .donate-item:first-of-type div {
        color: #44b549;
    }

    .donate-body .donate-item:nth-of-type(2) div {
        color: #00a0e9;
    }

    .bd_weixin_popup {
        position: fixed !important;
    }

    .myicon {
        margin-left: 3px;
        margin-right: 2px;
    }
</style>
