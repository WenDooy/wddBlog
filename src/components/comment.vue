<template>
    <div class="tmsgBox" ref="tmsgBox">
        <div class="tmsg-respond" ref="respondBox">
            <h3>
                发表评论
            </h3>
            <form>
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="说点什么..."
                        v-model="textarea">
                </el-input>
                <div :class="isEmojiOpen ? 'emoji' : 'emoji emoji-open'">
                    <div class="emoji-logo" @click="isEmojiOpen =! isEmojiOpen">
                        <span>emoji</span>
                    </div>
                    <div class="emoji-list">
                        <ul class="emoji-items emoji-items-show">
                            <li class="emoji-item" v-for="(item, index) in emojiList" :key="'item'+index"
                                @click="chooseEmoji(item.title)">
                                <img :src="item.url" alt="emoji">
                            </li>
                        </ul>
                    </div>
                </div>
                <el-row class="tmsg-r-info">
                    <el-col :span="24" class="info-submit">
                        <p class="tcolors-bg" @click="sendMsg">{{sendTip}}</p>
                    </el-col>
                </el-row>
            </form>
        </div>
        <div class="tmsg-comments" ref="listDom">
            <a href="#" class="tmsg-comments-tip">评论{{commentDetail ? commentDetail.length : 0}}条</a>
            <div class="tmsg-commentshow">
                <ul class="tmsg-commentlist">
                    <li class="tmsg-c-item" v-for="(item, index) in commentDetail" :key="'commment'+index">
                        <article>
                            <header>
                                <img :src="item.avatar" alt="img" onerror="">
                                <div class="i-name">
                                    {{item.username}}
                                </div>
                                <div class="i-time">
                                    <time>{{item.time}}</time>
                                </div>
                            </header>
                            <section>
                                <p v-html="item.content">{{item.content}}</p>
                            </section>
                        </article>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "comment",
        inject: ['reload'],
        data() {
            return {
                isEmojiOpen: true,
                textarea: '',
                emojiList: [{'title': '微笑', 'url': require('../assets/img/image/weixiao.gif')},
                    {'title': '嘻嘻', 'url': require('../assets/img/image/xixi.gif')},
                    {'title': '哈哈', 'url': require('../assets/img/image/haha.gif')},
                    {'title': '可爱', 'url': require('../assets/img/image/keai.gif')},
                    {'title': '可怜', 'url': require('../assets/img/image/kelian.gif')},
                    {'title': '挖鼻', 'url': require('../assets/img/image/wabi.gif')},
                    {'title': '吃惊', 'url': require('../assets/img/image/chijing.gif')},
                    {'title': '害羞', 'url': require('../assets/img/image/haixiu.gif')},
                    {'title': '挤眼', 'url': require('../assets/img/image/jiyan.gif')},
                    {'title': '闭嘴', 'url': require('../assets/img/image/bizui.gif')},
                    {'title': '鄙视', 'url': require('../assets/img/image/bishi.gif')},
                    {'title': '爱你', 'url': require('../assets/img/image/aini.gif')},
                    {'title': '泪', 'url': require('../assets/img/image/lei.gif')},
                    {'title': '偷笑', 'url': require('../assets/img/image/touxiao.gif')},
                    {'title': '亲亲', 'url': require('../assets/img/image/qinqin.gif')},
                    {'title': '生病', 'url': require('../assets/img/image/shengbing.gif')},
                    {'title': '太开心', 'url': require('../assets/img/image/taikaixin.gif')},
                    {'title': '白眼', 'url': require('../assets/img/image/baiyan.gif')},
                    {'title': '右哼哼', 'url': require('../assets/img/image/youhengheng.gif')},
                    {'title': '左哼哼', 'url': require('../assets/img/image/zuohengheng.gif')},
                    {'title': '嘘', 'url': require('../assets/img/image/xu.gif')},
                    {'title': '衰', 'url': require('../assets/img/image/shuai.gif')},
                    {'title': '吐', 'url': require('../assets/img/image/tu.gif')},
                    {'title': '哈欠', 'url': require('../assets/img/image/haqian.gif')},
                    {'title': '抱抱', 'url': require('../assets/img/image/baobao.gif')},
                    {'title': '怒', 'url': require('../assets/img/image/nu.gif')},
                    {'title': '疑问', 'url': require('../assets/img/image/yiwen.gif')},
                    {'title': '馋嘴', 'url': require('../assets/img/image/chanzui.gif')},
                    {'title': '拜拜', 'url': require('../assets/img/image/baibai.gif')},
                    {'title': '思考', 'url': require('../assets/img/image/sikao.gif')},
                    {'title': '汗', 'url': require('../assets/img/image/han.gif')},
                    {'title': '困', 'url': require('../assets/img/image/kun.gif')},
                    {'title': '睡', 'url': require('../assets/img/image/shui.gif')},
                    {'title': '钱', 'url': require('../assets/img/image/qian.gif')},
                    {'title': '失望', 'url': require('../assets/img/image/shiwang.gif')},
                    {'title': '酷', 'url': require('../assets/img/image/ku.gif')},
                    {'title': '色', 'url': require('../assets/img/image/se.gif')},
                    {'title': '哼', 'url': require('../assets/img/image/heng.gif')},
                    {'title': '鼓掌', 'url': require('../assets/img/image/guzhang.gif')},
                    {'title': '晕', 'url': require('../assets/img/image/yun.gif')},
                    {'title': '悲伤', 'url': require('../assets/img/image/beishang.gif')},
                    {'title': '抓狂', 'url': require('../assets/img/image/zhuakuang.gif')},
                    {'title': '黑线', 'url': require('../assets/img/image/heixian.gif')},
                    {'title': '阴险', 'url': require('../assets/img/image/yinxian.gif')},
                    {'title': '怒骂', 'url': require('../assets/img/image/numa.gif')},
                    {'title': '互粉', 'url': require('../assets/img/image/hufen.gif')},
                    {'title': '书呆子', 'url': require('../assets/img/image/shudaizi.gif')},
                    {'title': '愤怒', 'url': require('../assets/img/image/fennu.gif')},
                    {'title': '感冒', 'url': require('../assets/img/image/ganmao.gif')},
                    {'title': '心', 'url': require('../assets/img/image/xin.gif')},
                    {'title': '伤心', 'url': require('../assets/img/image/shangxin.gif')},
                    {'title': '猪', 'url': require('../assets/img/image/zhu.gif')},
                    {'title': '熊猫', 'url': require('../assets/img/image/xiongmao.gif')},
                    {'title': '兔子', 'url': require('../assets/img/image/tuzi.gif')},
                    {'title': '喔克', 'url': require('../assets/img/image/ok.gif')},
                    {'title': '耶', 'url': require('../assets/img/image/ye.gif')},
                    {'title': '不', 'url': require('../assets/img/image/no.gif')},
                    {'title': '赞', 'url': require('../assets/img/image/zan.gif')},
                    {'title': '来', 'url': require('../assets/img/image/lai.gif')},
                    {'title': '弱', 'url': require('../assets/img/image/ruo.gif')},
                    {'title': '草泥马', 'url': require('../assets/img/image/caonima.gif')},
                    {'title': '神马', 'url': require('../assets/img/image/shenma.gif')},
                    {'title': '囧', 'url': require('../assets/img/image/jiong.gif')},
                    {'title': '浮云', 'url': require('../assets/img/image/fuyun.gif')},
                    {'title': '给力', 'url': require('../assets/img/image/geili.gif')},
                    {'title': '围观', 'url': require('../assets/img/image/weiguan.gif')},
                    {'title': '威武', 'url': require('../assets/img/image/weiwu.gif')},
                    {'title': '话筒', 'url': require('../assets/img/image/huatong.gif')},
                    {'title': '蜡烛', 'url': require('../assets/img/image/lazhu.gif')},
                    {'title': '蛋糕', 'url': require('../assets/img/image/dangao.gif')},
                    {'title': '发红包', 'url': require('../assets/img/image/fahongbao.gif')}],
                sendTip: '评论',
                aid: 0,
                pageId: 0,
                hasMore: false,
                comment: {
                    username: '',
                    avator: '',
                    time: '',
                    content: '',
                    artId: 0,
                },
                commentDetail: []
            }
        },
        computed: {
            ...mapGetters([
                'commentList'
            ])
        },
        methods: {
            chooseEmoji(inner) {
                // console.log(inner);
                this.textarea += '[' + inner + ']';
            },
            sendMsg() {
                this.aid = this.$route.query.aid === undefined ? 0 : parseInt(this.$route.query.aid);
                let str = this.analyzeEmoji(this.textarea);
                this.comment.username = '游客';
                this.comment.avator = '';
                this.comment.time = this.getCreateTime();
                this.comment.content = str;
                this.comment.artId = this.aid;
                this.textarea = '';
                this.sendComment();
                let reset = setTimeout(function () {
                    this.sendTip = '评论';
                    clearTimeout(reset);
                }, 1000)

            },
            sendComment() {
                this.$store.dispatch('sendComment', this.comment);
                this.$nextTick(function () {
                    // window.location.reload()
                    this.reload()
                })
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
            },
            analyzeEmoji(commentMsg) {
                let pattern1 = /\[[\u4e00-\u9fa5]+\]/g;
                let pattern2 = /\[[\u4e00-\u9fa5]+\]/;
                let content = commentMsg.match(pattern1);
                let str = commentMsg;
                let img_src = '';
                if (content) {
                    for (let i = 0; i < content.length; i++) {
                        for (let j = 0; j < this.emojiList.length; j++) {
                            if ("[" + this.emojiList[j].title + "]" === content[i]) {
                                img_src = this.emojiList[j].url;
                                break;
                            }
                        }
                        str = str.replace(pattern2, '<img src="' + img_src + '">');
                    }
                }
                return str;
            },
            showCommentList() {
                this.aid = this.$route.query.aid === undefined ? 0 : parseInt(this.$route.query.aid);
                // //获取评论信息
                for (let i = 0; i < this.commentList.length; i++) {
                    if (this.commentList[i].artId === this.aid) {
                        this.commentDetail.push(this.commentList[i]);
                    }
                }

            },
            addMoreFun() {
                this.showCommentList();
            }
        },
        created() {
            this.$store.dispatch('getComments');
        },
        watch: {
            textarea() {
                if (this.textarea) {
                    this.sendTip = '发送';
                } else {
                    this.sendTip = '评论';
                }
            },
            'commentList': function () {
                this.showCommentList();
            }
        }
    }
</script>

<style scoped lang="less">
    .tmsgBox {
        position: relative;
        background: #fff;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 5px;
        margin-top: 20px;
    }

    .tmsg-respond h3 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .tmsg-respond h3 small {
        font-size: smaller;
        cursor: pointer;
    }

    .tmsg-respond textarea {
        background: #f4f6f7;
        height: 100px;
        margin-bottom: 10px;
    }

    .emoji {
        position: relative;
        z-index: 1;
    }

    .emoji-logo {
        margin-top: 10px;
        position: relative;
        border-radius: 4px;
        color: #ffffff;
        display: inline-block;
        background: #555555;
        border: 1px solid #ddd;
        font-size: 13px;
        padding: 0 6px;
        cursor: pointer;
        height: 30px;
        box-sizing: border-box;
        z-index: 2;
        line-height: 30px;
    }

    .emoji .emoji-logo:hover {
        animation: a 5s infinite ease-in-out;
        -webkit-animation: a 5s infinite ease-in-out;
    }

    .emoji .emoji-list {
        position: absolute;
        background: #fff;
        border: 1px solid #ddd;
        z-index: 1;
        top: 29px;
        border-radius: 0 4px 4px 4px;
        display: none;
    }

    .emoji-open .emoji-list {
        display: block;
    }

    .emoji-open .emoji-logo {
        border-radius: 4px 4px 0 0;
        border-bottom: none;
    }

    .emoji-open .emoji-logo:hover {
        animation: none;
        -webkit-animation: none;
    }

    .emoji .emoji-items {
        max-height: 197px;
        overflow: scroll;
        font-size: 0;
        padding: 10px;
        z-index: 1
    }

    .emoji .emoji-items .emoji-item {
        background: #f7f7f7;
        padding: 5px 10px;
        border-radius: 5px;
        display: inline-block;
        margin: 0 10px 12px 0;
        transition: 0.3s;
        line-height: 19px;
        font-size: 20px;
        cursor: pointer;
    }

    .emoji .emoji-items .emoji-item:hover {
        background: #eee;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),
        0 3px 1px -2px rgba(0, 0, 0, .2),
        0 1px 5px 0 rgba(0, 0, 0, .12);
        animation: a 5s infinite ease-in-out;
        -webkit-animation: a 5s infinite ease-in-out;
    }

    .emoji .emoji-list .emoji-bar {
        width: 100%;
        height: 30px;
        border-top: 1px solid #ddd;
        background: #fff;
        border-radius: 0 0 4px 4px;
        color: #444;
    }

    .emoji .emoji-list .emoji-bar .emoji-packages li {
        display: inline-block;
        line-height: 30px;
        font-size: 14px;
        padding: 0 10px;
        cursor: pointer;
        margin-right: 3px;
        text-align: center;
    }

    .emoji .emoji-list .emoji-bar .emoji-packages li:first-of-type {
        border-radius: 0 0 0 3px;
    }

    @-webkit-keyframes a {
        2% {
            -webkit-transform: translateY(1.5px) rotate(1.5deg);
            transform: translateY(1.5px) rotate(1.5deg)
        }
        4% {
            -webkit-transform: translateY(-1.5px) rotate(-.5deg);
            transform: translateY(-1.5px) rotate(-.5deg)
        }
        6% {
            -webkit-transform: translateY(1.5px) rotate(-1.5deg);
            transform: translateY(1.5px) rotate(-1.5deg)
        }
        8% {
            -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
            transform: translateY(-1.5px) rotate(-1.5deg)
        }
        10% {
            -webkit-transform: translateY(2.5px) rotate(1.5deg);
            transform: translateY(2.5px) rotate(1.5deg)
        }
        12% {
            -webkit-transform: translateY(-.5px) rotate(1.5deg);
            transform: translateY(-.5px) rotate(1.5deg)
        }
        14% {
            -webkit-transform: translateY(-1.5px) rotate(1.5deg);
            transform: translateY(-1.5px) rotate(1.5deg)
        }
        16% {
            -webkit-transform: translateY(-.5px) rotate(-1.5deg);
            transform: translateY(-.5px) rotate(-1.5deg)
        }
        18% {
            -webkit-transform: translateY(.5px) rotate(-1.5deg);
            transform: translateY(.5px) rotate(-1.5deg)
        }
        20% {
            -webkit-transform: translateY(-1.5px) rotate(2.5deg);
            transform: translateY(-1.5px) rotate(2.5deg)
        }
        22% {
            -webkit-transform: translateY(.5px) rotate(-1.5deg);
            transform: translateY(.5px) rotate(-1.5deg)
        }
        24% {
            -webkit-transform: translateY(1.5px) rotate(1.5deg);
            transform: translateY(1.5px) rotate(1.5deg)
        }
        26% {
            -webkit-transform: translateY(.5px) rotate(.5deg);
            transform: translateY(.5px) rotate(.5deg)
        }
        28% {
            -webkit-transform: translateY(.5px) rotate(1.5deg);
            transform: translateY(.5px) rotate(1.5deg)
        }
        30% {
            -webkit-transform: translateY(-.5px) rotate(2.5deg);
            transform: translateY(-.5px) rotate(2.5deg)
        }
        32%, 34% {
            -webkit-transform: translateY(1.5px) rotate(-.5deg);
            transform: translateY(1.5px) rotate(-.5deg)
        }
        36% {
            -webkit-transform: translateY(-1.5px) rotate(2.5deg);
            transform: translateY(-1.5px) rotate(2.5deg)
        }
        38% {
            -webkit-transform: translateY(1.5px) rotate(-1.5deg);
            transform: translateY(1.5px) rotate(-1.5deg)
        }
        40% {
            -webkit-transform: translateY(-.5px) rotate(2.5deg);
            transform: translateY(-.5px) rotate(2.5deg)
        }
        42% {
            -webkit-transform: translateY(2.5px) rotate(-1.5deg);
            transform: translateY(2.5px) rotate(-1.5deg)
        }
        44% {
            -webkit-transform: translateY(1.5px) rotate(.5deg);
            transform: translateY(1.5px) rotate(.5deg)
        }
        46% {
            -webkit-transform: translateY(-1.5px) rotate(2.5deg);
            transform: translateY(-1.5px) rotate(2.5deg)
        }
        48% {
            -webkit-transform: translateY(-.5px) rotate(.5deg);
            transform: translateY(-.5px) rotate(.5deg)
        }
        50% {
            -webkit-transform: translateY(.5px) rotate(.5deg);
            transform: translateY(.5px) rotate(.5deg)
        }
        52% {
            -webkit-transform: translateY(2.5px) rotate(2.5deg);
            transform: translateY(2.5px) rotate(2.5deg)
        }
        54% {
            -webkit-transform: translateY(-1.5px) rotate(1.5deg);
            transform: translateY(-1.5px) rotate(1.5deg)
        }
        56% {
            -webkit-transform: translateY(2.5px) rotate(2.5deg);
            transform: translateY(2.5px) rotate(2.5deg)
        }
        58% {
            -webkit-transform: translateY(.5px) rotate(2.5deg);
            transform: translateY(.5px) rotate(2.5deg)
        }
        60% {
            -webkit-transform: translateY(2.5px) rotate(2.5deg);
            transform: translateY(2.5px) rotate(2.5deg)
        }
        62% {
            -webkit-transform: translateY(-.5px) rotate(2.5deg);
            transform: translateY(-.5px) rotate(2.5deg)
        }
        64% {
            -webkit-transform: translateY(-.5px) rotate(1.5deg);
            transform: translateY(-.5px) rotate(1.5deg)
        }
        66% {
            -webkit-transform: translateY(1.5px) rotate(-.5deg);
            transform: translateY(1.5px) rotate(-.5deg)
        }
        68% {
            -webkit-transform: translateY(-1.5px) rotate(-.5deg);
            transform: translateY(-1.5px) rotate(-.5deg)
        }
        70% {
            -webkit-transform: translateY(1.5px) rotate(.5deg);
            transform: translateY(1.5px) rotate(.5deg)
        }
        72% {
            -webkit-transform: translateY(2.5px) rotate(1.5deg);
            transform: translateY(2.5px) rotate(1.5deg)
        }
        74% {
            -webkit-transform: translateY(-.5px) rotate(.5deg);
            transform: translateY(-.5px) rotate(.5deg)
        }
        76% {
            -webkit-transform: translateY(-.5px) rotate(2.5deg);
            transform: translateY(-.5px) rotate(2.5deg)
        }
        78% {
            -webkit-transform: translateY(-.5px) rotate(1.5deg);
            transform: translateY(-.5px) rotate(1.5deg)
        }
        80% {
            -webkit-transform: translateY(1.5px) rotate(1.5deg);
            transform: translateY(1.5px) rotate(1.5deg)
        }
        82% {
            -webkit-transform: translateY(-.5px) rotate(.5deg);
            transform: translateY(-.5px) rotate(.5deg)
        }
        84% {
            -webkit-transform: translateY(1.5px) rotate(2.5deg);
            transform: translateY(1.5px) rotate(2.5deg)
        }
        86% {
            -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
            transform: translateY(-1.5px) rotate(-1.5deg)
        }
        88% {
            -webkit-transform: translateY(-.5px) rotate(2.5deg);
            transform: translateY(-.5px) rotate(2.5deg)
        }
        90% {
            -webkit-transform: translateY(2.5px) rotate(-.5deg);
            transform: translateY(2.5px) rotate(-.5deg)
        }
        92% {
            -webkit-transform: translateY(.5px) rotate(-.5deg);
            transform: translateY(.5px) rotate(-.5deg)
        }
        94% {
            -webkit-transform: translateY(2.5px) rotate(.5deg);
            transform: translateY(2.5px) rotate(.5deg)
        }
        96% {
            -webkit-transform: translateY(-.5px) rotate(1.5deg);
            transform: translateY(-.5px) rotate(1.5deg)
        }
        98% {
            -webkit-transform: translateY(-1.5px) rotate(-.5deg);
            transform: translateY(-1.5px) rotate(-.5deg)
        }
        0%, to {
            -webkit-transform: translate(0) rotate(0deg);
            transform: translate(0) rotate(0deg)
        }
    }

    @keyframes a {
        2% {
            -webkit-transform: translateY(1.5px) rotate(1.5deg);
            transform: translateY(1.5px) rotate(1.5deg)
        }
        4% {
            -webkit-transform: translateY(-1.5px) rotate(-.5deg);
            transform: translateY(-1.5px) rotate(-.5deg)
        }
        6% {
            -webkit-transform: translateY(1.5px) rotate(-1.5deg);
            transform: translateY(1.5px) rotate(-1.5deg)
        }
        8% {
            -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
            transform: translateY(-1.5px) rotate(-1.5deg)
        }
        10% {
            -webkit-transform: translateY(2.5px) rotate(1.5deg);
            transform: translateY(2.5px) rotate(1.5deg)
        }
        12% {
            -webkit-transform: translateY(-.5px) rotate(1.5deg);
            transform: translateY(-.5px) rotate(1.5deg)
        }
        14% {
            -webkit-transform: translateY(-1.5px) rotate(1.5deg);
            transform: translateY(-1.5px) rotate(1.5deg)
        }
        16% {
            -webkit-transform: translateY(-.5px) rotate(-1.5deg);
            transform: translateY(-.5px) rotate(-1.5deg)
        }
        18% {
            -webkit-transform: translateY(.5px) rotate(-1.5deg);
            transform: translateY(.5px) rotate(-1.5deg)
        }
        20% {
            -webkit-transform: translateY(-1.5px) rotate(2.5deg);
            transform: translateY(-1.5px) rotate(2.5deg)
        }
        22% {
            -webkit-transform: translateY(.5px) rotate(-1.5deg);
            transform: translateY(.5px) rotate(-1.5deg)
        }
        24% {
            -webkit-transform: translateY(1.5px) rotate(1.5deg);
            transform: translateY(1.5px) rotate(1.5deg)
        }
        26% {
            -webkit-transform: translateY(.5px) rotate(.5deg);
            transform: translateY(.5px) rotate(.5deg)
        }
        28% {
            -webkit-transform: translateY(.5px) rotate(1.5deg);
            transform: translateY(.5px) rotate(1.5deg)
        }
        30% {
            -webkit-transform: translateY(-.5px) rotate(2.5deg);
            transform: translateY(-.5px) rotate(2.5deg)
        }
        32%, 34% {
            -webkit-transform: translateY(1.5px) rotate(-.5deg);
            transform: translateY(1.5px) rotate(-.5deg)
        }
        36% {
            -webkit-transform: translateY(-1.5px) rotate(2.5deg);
            transform: translateY(-1.5px) rotate(2.5deg)
        }
        38% {
            -webkit-transform: translateY(1.5px) rotate(-1.5deg);
            transform: translateY(1.5px) rotate(-1.5deg)
        }
        40% {
            -webkit-transform: translateY(-.5px) rotate(2.5deg);
            transform: translateY(-.5px) rotate(2.5deg)
        }
        42% {
            -webkit-transform: translateY(2.5px) rotate(-1.5deg);
            transform: translateY(2.5px) rotate(-1.5deg)
        }
        44% {
            -webkit-transform: translateY(1.5px) rotate(.5deg);
            transform: translateY(1.5px) rotate(.5deg)
        }
        46% {
            -webkit-transform: translateY(-1.5px) rotate(2.5deg);
            transform: translateY(-1.5px) rotate(2.5deg)
        }
        48% {
            -webkit-transform: translateY(-.5px) rotate(.5deg);
            transform: translateY(-.5px) rotate(.5deg)
        }
        50% {
            -webkit-transform: translateY(.5px) rotate(.5deg);
            transform: translateY(.5px) rotate(.5deg)
        }
        52% {
            -webkit-transform: translateY(2.5px) rotate(2.5deg);
            transform: translateY(2.5px) rotate(2.5deg)
        }
        54% {
            -webkit-transform: translateY(-1.5px) rotate(1.5deg);
            transform: translateY(-1.5px) rotate(1.5deg)
        }
        56% {
            -webkit-transform: translateY(2.5px) rotate(2.5deg);
            transform: translateY(2.5px) rotate(2.5deg)
        }
        58% {
            -webkit-transform: translateY(.5px) rotate(2.5deg);
            transform: translateY(.5px) rotate(2.5deg)
        }
        60% {
            -webkit-transform: translateY(2.5px) rotate(2.5deg);
            transform: translateY(2.5px) rotate(2.5deg)
        }
        62% {
            -webkit-transform: translateY(-.5px) rotate(2.5deg);
            transform: translateY(-.5px) rotate(2.5deg)
        }
        64% {
            -webkit-transform: translateY(-.5px) rotate(1.5deg);
            transform: translateY(-.5px) rotate(1.5deg)
        }
        66% {
            -webkit-transform: translateY(1.5px) rotate(-.5deg);
            transform: translateY(1.5px) rotate(-.5deg)
        }
        68% {
            -webkit-transform: translateY(-1.5px) rotate(-.5deg);
            transform: translateY(-1.5px) rotate(-.5deg)
        }
        70% {
            -webkit-transform: translateY(1.5px) rotate(.5deg);
            transform: translateY(1.5px) rotate(.5deg)
        }
        72% {
            -webkit-transform: translateY(2.5px) rotate(1.5deg);
            transform: translateY(2.5px) rotate(1.5deg)
        }
        74% {
            -webkit-transform: translateY(-.5px) rotate(.5deg);
            transform: translateY(-.5px) rotate(.5deg)
        }
        76% {
            -webkit-transform: translateY(-.5px) rotate(2.5deg);
            transform: translateY(-.5px) rotate(2.5deg)
        }
        78% {
            -webkit-transform: translateY(-.5px) rotate(1.5deg);
            transform: translateY(-.5px) rotate(1.5deg)
        }
        80% {
            -webkit-transform: translateY(1.5px) rotate(1.5deg);
            transform: translateY(1.5px) rotate(1.5deg)
        }
        82% {
            -webkit-transform: translateY(-.5px) rotate(.5deg);
            transform: translateY(-.5px) rotate(.5deg)
        }
        84% {
            -webkit-transform: translateY(1.5px) rotate(2.5deg);
            transform: translateY(1.5px) rotate(2.5deg)
        }
        86% {
            -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
            transform: translateY(-1.5px) rotate(-1.5deg)
        }
        88% {
            -webkit-transform: translateY(-.5px) rotate(2.5deg);
            transform: translateY(-.5px) rotate(2.5deg)
        }
        90% {
            -webkit-transform: translateY(2.5px) rotate(-.5deg);
            transform: translateY(2.5px) rotate(-.5deg)
        }
        92% {
            -webkit-transform: translateY(.5px) rotate(-.5deg);
            transform: translateY(.5px) rotate(-.5deg)
        }
        94% {
            -webkit-transform: translateY(2.5px) rotate(.5deg);
            transform: translateY(2.5px) rotate(.5deg)
        }
        96% {
            -webkit-transform: translateY(-.5px) rotate(1.5deg);
            transform: translateY(-.5px) rotate(1.5deg)
        }
        98% {
            -webkit-transform: translateY(-1.5px) rotate(-.5deg);
            transform: translateY(-1.5px) rotate(-.5deg)
        }
        0%, to {
            -webkit-transform: translate(0) rotate(0deg);
            transform: translate(0) rotate(0deg)
        }
    }

    /*用户输入表单*/
    .tmsg-r-info {
        margin: 10px 0;
    }

    .tmsg-r-info input {
        height: 30px;
        border-radius: 4px;
        background: #f4f6f7;
    }

    .tmsg-r-info .info-submit {
        margin: 10px 0;
        text-align: center;
    }

    .tmsg-r-info .info-submit p, .tmsg-commentshow h1 {
        background: #666666;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        /*transition: all .3s ease-in-out;*/
        height: 30px;
        line-height: 30px;
        text-align: center;
    }

    /*.tmsg-r-info .info-submit p:hover{*/
    /*    background: #47456d;*/
    /*}*/
    /*评论列表*/
    .tmsg-comments .tmsg-comments-tip {
        display: block;
        border-left: 2px solid #363d4c;
        padding: 0 10px;
        margin: 40px 0;
        font-size: 20px;
    }

    .tmsg-commentlist {
        margin-bottom: 20px;

    }

    .tmsg-commentshow > .tmsg-commentlist {
        border-bottom: 1px solid #e5eaed;
    }

    .tmsg-c-item {
        border-top: 1px solid #e5eaed;
    }

    .tmsg-c-item article {
        margin: 20px 0;
    }

    .tmsg-c-item article header {
        margin-bottom: 10px;
    }

    .tmsg-c-item article header img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        float: left;
        transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        margin-right: 15px;
        object-fit: cover;
    }

    .tmsg-c-item article header img:hover {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }

    .i-name {
        font-size: 14px;
        margin: 5px 8px 7px 0;
        color: #444;
        font-weight: bold;
        display: inline-block;
    }

    .i-class {
        display: inline-block;
        margin-left: 10px;
        background: #dff0d8;
        color: #3c763d;
        border-radius: 5px;
        padding: 3px 6px;
        font-size: 12px;
        font-weight: 400;
    }

    .i-time {
        color: #aaa;
        font-size: 12px;
    }

    .tmsg-c-item article section {
        margin-left: 80px;
    }

    .tmsg-c-item article section p img {
        vertical-align: middle;
    }

    .tmsg-c-item article section .tmsg-replay {
        margin: 10px 0;
        font-size: 12px;
        color: #64609E;
        cursor: pointer;
    }
</style>
