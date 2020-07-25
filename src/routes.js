import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import('./pages/Home')
const ArticleList = () => import('./pages/ArticleList')
const ArticleDetail = () => import('./pages/ArticleDetail')
const WriteBlog = () => import('./pages/WriteBlog')
const AboutMe = () => import('./pages/AboutMe')

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: Home,
            meta: {
                auth: true
            },
            name: 'Home'
        }, //首页
        {
            path: '/Home',
            component: Home,
            meta: {
                auth: true
            },
            name: 'Home'
        }, {
            path: '/Article/:id',
            component: ArticleList,
            meta: {
                auth: true
            },
            name: 'Article'
        },{
            path: '/ArticleDetail',
            component: ArticleDetail,
            meta:{
                auth: true
            },
            name: 'ArticleDetail'
        },
        {
            path: '/WriteBlog',
            component: WriteBlog,
            meta: {
                auth: true
            },
            name: 'WriteBlog'
        },
        {
            path: '/Aboutme',
            component: AboutMe,
            meta: {
                auth: true
            },
            name: 'Aboutme'
        }]
})
