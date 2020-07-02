<template>
    <div>
        <div class="headBack">
            <el-row class="container">
                <el-col :span="24">
                    <!--                    pc 导航栏-->
                    <div class="headBox">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                                 @select="handleSelect" :router="true">
                            <el-menu-item index="/Home"><i class="el-icon-s-home icon"></i>首页</el-menu-item>
                            <el-submenu index="/ArticleList">
                                <template slot="title"><i class="el-icon-s-order icon"></i>分类</template>
                                <el-menu-item v-for="(item, index) in categoryList" :key="'class'+index"
                                              @click="queryCategory(item.categoryId)">
                                    {{item.categoryName}}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item index="/Aboutme"><i class="el-icon-s-check icon"></i>关于</el-menu-item>
                            <!--  搜索框-->
                            <div class="pcsearchbox">
                                <!--                                <i class="el-icon-search pcsearchicon"></i>-->
                                <el-input

                                        placeholder="请输入内容"
                                        prefix-icon="el-icon-search"
                                        v-model="input"
                                        @keyup.enter.native="searchEnterFun" @change="searchChangeFun">
                                </el-input>
                            </div>

                            <!--   登录 注册-->
                            <div class="userInfo">
                                <div v-show="!haslogin" class="nologin">
                                    <a href="javascript: void(0);">登录</a>| <!--登录注册事件-->
                                    <a href="javascript: void(0);">注册</a>
                                </div>
                                <div v-show="haslogin" class="haslogin">
                                    <i class="el-icon-user"></i>
                                    <ul class="haslogin-info">
                                        <li>
                                            <a href="#/UserInfo">个人中心</a>
                                        </li>
                                        <li>
                                            <a href="#/LikeCollect?like=1">喜欢列表</a>
                                        </li>
                                        <li>
                                            <a href="#/LikeCollect?like=2">收藏列表</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);">退出登录</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-menu>
                    </div>

                    <!--移动端-->
                    <div class="mobileBox">
                        <div class="hideMenu">
                            <i @click="changepMenu()" class="el-icon-menu"></i>
                            <el-collapse-transition>
                                <el-menu
                                        :default-active="activeIndex"
                                        class="el-menu-vertical-demo mlistmenu"
                                        v-show="!pMenu"
                                        @open="handleOpen"
                                        @close="handleClose"
                                        background-color="#545c64"
                                        text-color="#fff"
                                        active-text-color="#ffd04b"
                                        :unique-opened="true"
                                        :router="true">
                                    <el-menu-item index="/Home">
                                        <i class="el-icon-s-home icon"></i>
                                        首页
                                    </el-menu-item>
                                    <el-submenu index="/ArticleList">
                                        <template slot="title">
                                            <i class="el-icon-s-order icon"></i>
                                            <span slot="title">分类</span>
                                        </template>
                                        <el-menu-item v-for="(item, index) in categoryList" :key="'class'+index"
                                                      :index="'/ArticleList?classId='+item.categoryId">
                                            {{item.categoryName}}
                                        </el-menu-item>
                                    </el-submenu>
                                    <el-menu-item index="/Aboutme">
                                        <i class="el-icon-s-check icon"></i>
                                        <span slot="title">关于</span>
                                    </el-menu-item>
                                    <el-menu-item index="/login">
                                        <span slot="title">登录</span>
                                    </el-menu-item>
                                    <el-menu-item index="/register">
                                        <span slot="title">注册</span>
                                    </el-menu-item>
                                </el-menu>
                            </el-collapse-transition>
                            <!--搜索-->
                            <div class="searchBox">
                                <el-input placeholder="" icon="search" v-model="input"
                                          @keyup.enter.native="searchEnterFun" :on-icon-click="searchEnterFun"
                                          @change="searchChangeFun">
                                </el-input>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!--背景图片-->
        <div class="headImgBox" style="">
            <div class="scene">
                <div><span id="backgroundImg">
<!--                    <img src="../assets/img/background.jpg" alt="img">-->
                </span></div>
            </div>
            <div class="h-information">
                <a href="/Aboutme">
                    <img src="../assets/img/photo.jpg" alt="img">
                </a>
                <h2 class="h-description">
                    <router-link to="/Aboutme">
                        Hello World!
                    </router-link>
                </h2>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'header',
        data() {
            return {
                userInfo: '',//用户信息
                haslogin: false,//是否登录
                // classListObj: [],
                input: '',//搜索框输入,
                pMenu: true,//手机端菜单开关
                activeIndex: '/Home',
                categoryId: 0
            };
        },
        computed: {
            ...mapGetters([
                'categoryList',
                'articleList'
            ])
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(this.pMenu)
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key) {
                this.activeIndex = this.$route.path === '/' ? '/Home' : this.$route.path;
                console.log(key, this.activeIndex);
            },
            changepMenu() {
                this.pMenu = !this.pMenu;
            },
            getCategoryList() {
                this.pMenu = true;
                this.activeIndex = this.$route.path === '/' ? '/Home' : this.$route.path;
                console.log(this.activeIndex)
                //登录
                // this.classListObj = this.$store.getters.categoryList;
                // if ((this.$route.name === "ArticleList" || this.$route.name === "Home") && this.$store.state.keywords) {
                //     this.input = this.$store.state.keywords;
                // } else {
                //     this.input = '';
                //     this.$store.state.keywords = '';
                // }
            },
            queryCategory(categoryId) {
                console.log(categoryId)
                this.$router.push({
                    name: 'Article',
                    params: {
                        id: categoryId
                    }
                })
            },
            searchChangeFun() {//input change
                if (this.input === '') {
                    this.$store.state.keywords = '';
                    this.$router.push({path: '/'});
                }
            },
            searchEnterFun() { //input Enter
                if (this.input) {
                    this.$store.state.keywords = this.input;
                    this.$router.push({path: '/ArticleList?keywords=' + this.input});
                } else {
                    this.$router.push({path: '/'});
                }
                this.input = '';
            }
        },
        created() {
            this.$store.dispatch('getCategory')
        },
        watch: {
            // '$route': 'routechange',
            'categoryList': function () {
                this.getCategoryList()
            }
        }
    }
</script>

<style lang="less">

    /*********头部导航栏********/

    /*头部导航栏盒子*/

    .headBack {
        width: 100%;
        background: rgba(40, 42, 44, 0.6);
        /*margin-bottom:30px;*/
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 100;
    }

    .icon {
        color: #f0f0f0 !important;
    }

    .headBox li.is-active {
        /*background: #48456C;*/
        background: rgba(73, 69, 107, 0.7);
    }

    .headBox .el-menu {
        background: transparent;
        border-bottom: none !important;
    }

    .headBox .el-menu-demo li.el-menu-item,
    .headBox .el-menu--horizontal .el-submenu .el-submenu__title {
        height: 38px;
        line-height: 38px;
        border-bottom: none !important;

    }

    .headBox .el-submenu li.el-menu-item {
        height: 38px;
        line-height: 38px;
    }

    .headBox .fa-wa {
        vertical-align: baseline;
    }

    .headBox .el-menu-item,
    .headBox .el-menu-item.is-active,
    .headBox .el-menu-item:hover,
    .headBox .el-submenu .el-submenu__title,
    .headBox .el-submenu__title i.el-submenu__icon-arrow{
        color: #fff;
    }

    .headBox .el-menu--horizontal .el-submenu > .el-menu {
        top: 38px;
        border: none;
        padding: 0;
    }

    .headBox > ul li.el-menu-item:hover,
    .headBox > ul li.el-submenu:hover {
        background: #48456C;
        border-bottom: none;
    }

    .headBox > ul .el-submenu .el-menu .el-menu-item {
        min-width: 0;
    }

    /*pc搜索框*/

    .headBox .pcsearchbox {
        padding: 0;
        max-width: 170px;
        /*min-width: 30px;*/
        height: 100%;
        line-height: 38px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }

    .headBox .pcsearchbox:hover .pcsearchinput {
        opacity: 1;
        /*transform: scaleX(1);*/
        visibility: visible;
    }

    .headBox .pcsearchbox i.pcsearchicon {
        color: #fff;
        padding-left: 10px;
    }

    .headBox .pcsearchbox .pcsearchinput {
        width: 180px;
        padding: 5px 5px 5px 5px;
        background: rgba(40, 42, 44, 0.6);
        /*border-radius: 0 0 2px 2px;*/
        position: absolute;
        right: 0;
        top: 38px;
        opacity: 0;
        visibility: hidden;
        /*transform: scaleX(0);*/
        transform-origin: right;
        transition: all 0.3s ease-out;
    }

    .headBox .pcsearchbox .hasSearched {
        opacity: 1;
        /*transform: scaleX(1);*/
        visibility: visible;
    }

    .headBox .pcsearchbox .el-input {
        width: 100%;
    }

    .headBox .el-input__inner {
        height: 30px;
        border: none;
        background: #fff;
        /*border: 1px solid #333;*/
        border-radius: 2px;
        padding-right: 10px;
    }

    .headBox .userInfo {
        height: 100%;
        line-height: 38px;
        position: absolute;
        right: 200px;
        top: 0;
        color: #fff;
    }

    .headBox .userInfo a {
        color: #fff;
        font-size: 13px;
        transition: all 0.2s ease-out;
    }

    .headBox .userInfo a:hover {
        color: #48456C;
    }

    .headBox .nologin {
        text-align: right;
    }

    .headBox .haslogin {
        text-align: right;
        position: relative;
        min-width: 80px;
        cursor: pointer;
    }

    .headBox .haslogin:hover ul {
        visibility: visible;
        opacity: 1;
    }

    .headBox .haslogin ul {
        background: rgba(40, 42, 44, 0.6);
        /*background: rgba(51, 51, 79, 0.5);*/
        padding: 5px 10px;
        position: absolute;
        right: 0;
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s ease-out;
    }

    .headBox .haslogin ul li {
        border-bottom: 1px solid #48456C;
    }

    .headBox .haslogin ul li:last-child {
        border-bottom: 1px solid transparent;
    }

    /*******移动端*******/

    .mobileBox {
        position: relative;
        height: 38px;
        line-height: 38px;
        color: #fff;
    }

    .hideMenu {
        position: relative;
        width: 100%;
        height: 100%;
        line-height: 38px;
    }

    .hideMenu .mlistmenu {
        width: 100%;
        position: absolute;
        left: 0;
        top: 100%;
        box-sizing: border-box;
        z-index: 999;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12), 0 0 8px 0 rgba(0, 0, 0, .04);
        background: #48456C;
        color: #fff;
        border-right: none;
    }

    .hideMenu .el-submenu .el-menu {
        background: #64609E;
    }

    .hideMenu .el-menu-item,
    .hideMenu .el-submenu__title {
        color: #fff;
    }

    .hideMenu > i {
        position: absolute;
        left: 10px;
        top: 12px;
        width: 30px;
        height: 30px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }

    .hideMenu .el-menu-item,
    .el-submenu__title {
        height: 40px;
        line-height: 40px;
    }

    .mobileBox .searchBox {
        padding-left: 40px;
        width: 100%;
        box-sizing: border-box;
    }

    .mobileBox .searchBox .el-input__inner {
        display: block;
        border-radius: 2px;
        border: none;
        height: 25px;
    }

    .hideMenu ul.mlistmenu.pshow {
        display: block;
    }

    .hideMenu ul.mlistmenu .el-submenu__icon-arrow,
    .mobileBox li.el-menu-item a {
        color: #fff;
    }

    .hideMenu > ul li.el-menu-item:hover,
    .hideMenu > ul li.el-menu-item.is-active {
        background: #48576a;
    }


    /*头部背景图*/

    .headImgBox {
        height: 600px;
        position: relative;
        width: 100%;
        background-size: cover;
        background-position: center 50%;
        background-repeat: no-repeat;
        margin-bottom: 90px;
        background-image: url('../assets/img/background.jpg');
    }

    .h-information {
        text-align: center;
        width: 70%;
        margin: auto;
        position: relative;
        top: 480px;
        padding: 40px 0;
        font-size: 16px;
        opacity: 0.98;
        background: rgba(238, 238, 238, 0.5);
        border-radius: 5px;
        z-index: 1;
        animation: b 1s ease-out;
        -webkit-animation: b 1s ease-out;
    }

    @-webkit-keyframes b {
        0% {
            -webkit-transform: translateY(90px);
            transform: translateY(90px);
        }
        80% {
            -webkit-transform: translateY(5px);
            transform: translateY(5px)
        }
        90% {
            -webkit-transform: translateY(-5px);
            transform: translateY(-5px)
        }
        to {
            -webkit-transform: translateY(0);
            transform: translateY(0)
        }
    }

    @keyframes b {
        0% {
            -webkit-transform: translateY(90px);
            transform: translateY(90px);
        }
        80% {
            -webkit-transform: translateY(5px);
            transform: translateY(5px)
        }
        90% {
            -webkit-transform: translateY(-5px);
            transform: translateY(-5px)
        }
        to {
            -webkit-transform: translateY(0);
            transform: translateY(0)
        }
    }

    .h-information img {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        object-fit: cover;
    }

    .h-information img:hover {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }

    .h-information h2 {
        margin-top: 20px;
        font-size: 18px;
        font-weight: 700;
        /*font-family: 'Sigmar One';*/
    }

    .h-information h2 a {
        background: linear-gradient(to right, #DF2050, #48456D);
        -webkit-background-clip: text;
        color: transparent;
    }

    .headImgBox .scene {
        width: 100%;
        /*height:300px;*/
        text-align: center;
        font-size: 100px;
        font-weight: 200;
        color: #fff;
        position: absolute;
        left: 0;
        top: 160px;
        font-family: 'Sigmar One', Arial;
        text-shadow: 0 2px 2px #47456d;

    }

    .headImgBox .scene span {
        transform: matrix(1, 0, 0, 1, 0, 0);
        -webkit-transform: matrix(1, 0, 0, 1, 0, 0);
        text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
    }

    .saying:after {
        content: "|";
        font-family: Arial, sans-serif;
        font-size: 1em;
        /*line-height: 0;*/
        display: inline-block;
        vertical-align: baseline;
        opacity: 1;
        text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
        animation: caret 500ms infinite;
    }

    @keyframes caret {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
</style>
