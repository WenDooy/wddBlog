export default {
    keywords: state => {
        return state.keywords;//查找的关键字
    },
    articleContent: state => {
        return state.articleContent;
    },
    articleList: state => {
        return state.articleList;
    },
    categoryList: state =>{
        return state.categoryList;
    },
    commentList: state => {
        return state.commentList;
    }
}
