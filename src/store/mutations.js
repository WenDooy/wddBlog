
export default {
    GET_ARTICLE(state, article){
        state.articleList = article;
    },
    GET_COMMENT(state, comment){
        state.commentList = comment;
    },
    GET_CATEGORY(state, categoryList){
        state.categoryList = categoryList;
    },
    SEND_COMMENT(){
        // this.GET_COMMENT();
    },
    UPDATE_ARTICLE_CONTENT(state, value){
        state.articleContent = value;
    },
    PUBLISH_ESSAY(){
        // this.$store.dispatch('getArticle');
    },
    ADD_CATEGORY(){
        //
    }
}
