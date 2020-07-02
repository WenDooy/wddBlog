import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: resolve => require(['./pages/Home.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'Home'
        }, //首页
        {
            path: '/Home',
            component: resolve => require(['./pages/Home.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'Home'
        }, {
            path: '/Article/:id',
            component: resolve => require(['./pages/ArticleList.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'Article'
        },{
            path: '/ArticleDetail',
            component: resolve => require(['./pages/ArticleDetail.vue'], resolve),
            meta:{
                auth: true
            },
            name: 'ArticleDetail'
        },
        {
            path: '/WriteBlog',
            component: resolve => require(['./pages/WriteBlog.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'WriteBlog'
        },
        {
            path: '/Aboutme',
            component: resolve => require(['./pages/AboutMe.vue'], resolve),
            meta: {
                auth: true
            },
            name: 'Aboutme'
        }]
})
