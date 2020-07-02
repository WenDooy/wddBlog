import api from '../api/index'

//
// let portUrl = "http://"+window.location.host+"/port/";
const AV = api.api;
export default {
    getArticle: async ({commit}) => {
        const queryArt = new AV.Query('Article');
        const articles = await queryArt.find();
        const articleList = articles.map(article => article.toJSON());
        commit('GET_ARTICLE', articleList);
    },
    getComments: async ({commit}) => {
        const queryComment = new AV.Query('Comment');
        const comments = await queryComment.find();
        const commentList = comments.map(comment => comment.toJSON());
        commit('GET_COMMENT', commentList);
    },
    publishEssay: ({commit}, articleData) => {
        // 声明 class
        const Article = AV.Object.extend('Article');
        const article = new Article();
        article.set('id', articleData.id);
        article.set('title', articleData.title);
        article.set('description', articleData.description);
        article.set('create_time', articleData.create_time);
        article.set('tags', articleData.tags);
        article.set('categoryId', articleData.categoryId);
        article.set('content', articleData.content);
        article.save().then((article) => {
            // 成功保存之后，执行其他逻辑
            console.log(`保存成功。objectId：${article.id}`);
        }, (error) => {
            // 异常处理
            console.log(error)
        });
        commit('PUBLISH_ESSAY');
    },
    //添加文章类别
    addCategory: ({commit}, data) => {
            const Category = AV.Object.extend('Category');
            const category = new Category();
            category.set('categoryName', data.category.categoryName);
            category.set('categoryId', data.category.categoryId);
            category.save().then((category) => {
                console.log(`保存成功。 objectId: ${category.id}`);
            }, (error) => {
                console.log(error);
            })
        commit('ADD_CATEGORY');
    },
    queryCategory: async ({commit}, categoryId) => {
        const query = new AV.Query('Article');
        let articleList = [];
        query.equalTo('categoryId', categoryId);
        await query.find().then((article) => {
            // students 是包含满足条件的 Student 对象的数组
            articleList = article.map((item) => item.toJSON());
        });
        commit('GET_ARTICLE', articleList);
    },
    getCategory: async ({commit}) => {
        const queryCate = new AV.Query('Category');
        const categorys = await queryCate.find();
        const categoryList = categorys.map(category => category.toJSON());
        commit('GET_CATEGORY', categoryList);
    },
    sendComment: ({commit}, commentData) => {
        const Comment = AV.Object.extend('Comment');
        const comment = new Comment();
        comment.set('username', commentData.username);
        comment.set('artId', commentData.artId);
        comment.set('content', commentData.content);
        comment.set('time', commentData.time);
        comment.save().then((comment) => {
            // 成功保存之后，执行其他逻辑
            console.log(`保存成功。objectId：${comment.id}`);
        }, (error) => {
            // 异常处理
            console.log(error)
        });
        commit('SEND_COMMENT');
    },
    getArticleContent({commit}, value) {
        commit('UPDATE_ARTICLE_CONTENT', value);
    },
    //查询文章分类
    artClassData: ({commit}) => {
        if (sessionStorage.getItem('classList')) {
            let data = JSON.parse(sessionStorage.getItem('classList'));
            commit('SET_ART_CLASS', data);
        } else {
            // let url = portUrl + 'article/ArtClassData';
            // axios.get(url).then(response => {
            //     if(response.data.code === 1001){
            //         sessionStorage.setItem('classList',JSON.stringify(response.data.data));
            //         commit('SET_ART_CLASS', response.data.data);
            //     }else{
            //         alert("查询失败")
            //     }
            // })
        }
    }

}
